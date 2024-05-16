import { useRecoilValue } from "recoil";
import { Navigate, Outlet } from "react-router-dom";
import { authState } from "../../atoms/authAtom";

const ProtectedRoute = () => {
  const auth = useRecoilValue(authState);

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
