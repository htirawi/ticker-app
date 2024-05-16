import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { authState } from "../../atoms/authAtom";

const Header = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      expiresIn: null,
      username: "",
    });
    localStorage.removeItem("authState");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md py-4 px-8 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={handleLogoClick}
      >
        <span className="text-2xl font-bold text-green-600">Ticker</span>
      </div>
      <div className="flex items-center space-x-4">
        {auth.isAuthenticated && (
          <div className="flex items-center space-x-4">
            <div className="text-gray-700">
              Hi, <span className="font-bold">{auth.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 font-bold text-white rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
