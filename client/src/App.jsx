import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import AuthTokenChecker from "./components/AuthTokenChecker/AuthTokenChecker";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import RecoilInitializer from "./components/RecoilInitializer/RecoilInitializer";
import Footer from "./components/Footer/Footer";

const App = () => (
  <RecoilRoot>
    <RecoilInitializer />
    <div className="min-h-screen flex flex-col">
      <Router>
        <AuthTokenChecker />

        <Header />
        <main className="main-content flex-grow w-full min-h-screen flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/home" element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />

        <ToastContainer autoClose={3000} pauseOnHover={true} />
      </Router>
    </div>
  </RecoilRoot>
);

export default App;
