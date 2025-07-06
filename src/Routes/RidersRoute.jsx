import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import LoadingSpinner from "../Pages/Shared/Utilities/LoadingSpinner";

const RidersRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();
  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!currentUser || role !== "rider") {
    return <Navigate state={location.pathname} to="/forbidden"></Navigate>;
  }

  return children;
};

export default RidersRoute;
