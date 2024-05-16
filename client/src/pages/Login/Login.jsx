import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";

import { authState } from "../../atoms/authAtom";
import useAuthStatus from "../../hooks/useAuthStatus";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const Login = () => {
  const isLoggedIn = useAuthStatus();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post(
        "/auth/login",
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((response) => {
        const { access_token, expires_in } = response.data;
        const [user] = username.split("@");
        const newAuthState = {
          token: access_token,
          isAuthenticated: true,
          expiresIn: Date.now() + expires_in * 1000, // Convert seconds to milliseconds and add to current time
          username: user,
        };
        setAuth(newAuthState);
        localStorage.setItem("authState", JSON.stringify(newAuthState));
        toast.success("Login successful!");
        navigate("/home");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
          toast.error(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          console.error("Error request:", error.request);
          toast.error("No response received from server.");
        } else {
          console.error("Error message:", error.message);
          toast.error("Error: Something went wrong.");
        }
      });
  };

  const isButtonDisabled = !username || !password;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-green-500">
      <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
        <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
          </svg>
        </div>
        <form className="p-12 md:p-24" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-3 mt-4 text-white p-2 md:p-4  uppercase rounded-lg font-bold flex items-center justify-center ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={isButtonDisabled}
          >
            <FaSignInAlt className="mr-2" /> Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
