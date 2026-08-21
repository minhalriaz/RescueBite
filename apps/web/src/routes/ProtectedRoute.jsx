import { Navigate, useLocation } from "react-router-dom";
import {
  dashboardForRole,
  getStoredUser,
  isAuthenticated,
} from "../lib/auth";


export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const user = getStoredUser();

  if (!isAuthenticated() || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to={dashboardForRole(user.role)} replace />;
  }

  return children;
}