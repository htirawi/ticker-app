import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import { toast } from "react-toastify";

/**
 * This hook checks if the access token has expired
 * and refreshes it if necessary
 * @returns {null}
 */
const useAuthTokenChecker = () => {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    if (!auth.isAuthenticated) return;

    const checkTokenExpiration = async () => {
      // Check if the token has expired
      if (auth.expiresIn && Date.now() > auth.expiresIn) {
        try {
          const newAuthState = {
            ...auth,
            expiresIn: Date.now() + 60000,
          };
          setAuth(newAuthState);
          // Update the auth state in local storage
          localStorage.setItem("authState", JSON.stringify(newAuthState));
          toast.success("Token refreshed successfully.");
        } catch (error) {
          console.error("Failed to refresh token", error);
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
    };

    // Check the token expiration every 10 minutes
    const interval = setInterval(checkTokenExpiration, 600000);
    return () => clearInterval(interval);
  }, [auth, setAuth]);

  return null;
};

export default useAuthTokenChecker;
