import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";

/**
 * This hook initializes the auth state from the local storage
 * when the app is first loaded
 * If the token is still valid, the user will be logged in
 * @returns {void}
 *
 */
const useInitializeAuth = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("authState"));
    if (storedAuth && storedAuth.expiresIn > Date.now()) {
      setAuth(storedAuth);
    } else {
      localStorage.removeItem("authState");
    }
  }, [setAuth]);
};

export default useInitializeAuth;
