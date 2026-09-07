import { Navigate } from "react-router-dom";
import { getStoredUser, isAuthenticated } from "../lib/auth";

export default function AdminProtectedRoute({ children }) {
  const user = getStoredUser();

  if (!isAuthenticated() || !user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
