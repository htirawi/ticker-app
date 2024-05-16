import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";

/**
 * This hook returns the current authentication status
 * @returns {boolean} isLoggedIn
 */
const useAuthStatus = () => {
  const auth = useRecoilValue(authState);
  const isAuthenticated = auth.isAuthenticated;
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isAuthenticated);

  useEffect(() => {
    // Update the local state when the auth state changes
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  return isLoggedIn;
};

export default useAuthStatus;
