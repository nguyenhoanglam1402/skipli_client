import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/login-form";
import ProtectedRoute from "../components/common/protectedRoute";
import HomePage from "../pages/home-page";

const Router = () => {
  return <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/" element={
      <ProtectedRoute
        isAuthenticated={!!localStorage.getItem("phoneNumber")}
        children={<HomePage />} />
    } />
  </Routes>;
};

export default Router;