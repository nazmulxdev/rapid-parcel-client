import React from "react";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Pages/Shared/Utilities/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
