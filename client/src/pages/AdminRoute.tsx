import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function AdminRoute() {
  const { user } = useAuth();
  return <>{user?.role_id === 1 ? <Outlet /> : <Navigate to="/" />}</>;
}

export default AdminRoute;
