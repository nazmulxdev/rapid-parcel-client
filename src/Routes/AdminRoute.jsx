import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import LoadingSpinner from "../Pages/Shared/Utilities/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();
  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!currentUser || role !== "admin") {
    return <Navigate state={location.pathname} to="/forbidden"></Navigate>;
  }

  return children;
};

export default AdminRoute;
