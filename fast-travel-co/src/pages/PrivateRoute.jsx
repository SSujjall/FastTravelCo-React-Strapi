/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { authService } from "../services/Auth";

const PrivateRoute = ({ children }) => {
  return authService.isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
