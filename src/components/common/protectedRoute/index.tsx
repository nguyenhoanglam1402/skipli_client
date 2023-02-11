import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean,
  children: ReactElement
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { isAuthenticated, children } = props;
  console.log(isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;