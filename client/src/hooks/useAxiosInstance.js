import { useMemo } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";

import { authState } from "../atoms/authAtom";
import { toast } from "react-toastify";

/**
 * This hook creates an axios instance with the base URL set to the API server
 * and adds an interceptor to add the access token to the request
 * and refresh the access token if it has expired
 * @returns {AxiosInstance} The axios instance
 */
const useAxiosInstance = () => {
  const [auth, setAuth] = useRecoilState(authState);

  // Create a new axios instance with the base URL set to the API server
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:5000/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add a request interceptor to add the access token to the request
    instance.interceptors.request.use(
      async (config) => {
        const token = auth.token;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor to refresh the access token if it has expired
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newAuthState = {
              ...auth,
              expiresIn: Date.now() + 600000, // 10 minutes
            };
            setAuth(newAuthState);
            localStorage.setItem("authState", JSON.stringify(newAuthState));

            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAuthState.token}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAuthState.token}`;

            return axiosInstance(originalRequest);
          } catch (err) {
            setAuth({
              isAuthenticated: false,
              token: null,
              refreshToken: null,
              expiresIn: null,
              username: "",
            });
            localStorage.removeItem("authState");
            window.location.href = "/";
            toast.error("Session expired. Please log in again.");
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [auth, setAuth]);

  return axiosInstance;
};

export default useAxiosInstance;
