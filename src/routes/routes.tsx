import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/login-form";
import ProtectedRoute from "../components/common/protectedRoute";
import HomePage from "../pages/home-page";

const Router = () => {
  const checkAuthen = () => {
    return localStorage.getItem("phoneNumber") !== undefined;
  };
  return <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/" element={
      <ProtectedRoute
        isAuthenticated={checkAuthen()}
        children={<HomePage />} />
    } />
  </Routes>;
};

export default Router;