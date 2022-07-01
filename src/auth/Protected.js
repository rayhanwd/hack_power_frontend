import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const  RequireAuth = ({ children }) => {
  let auth = localStorage.getItem("token");
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;