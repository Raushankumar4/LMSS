import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/logIn" replace />;
};

export default ProtectedRoute;
