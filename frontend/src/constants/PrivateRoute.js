import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  USER_DASHBOARD_ROUTE,
} from "./AppRoutes";

const PrivateRoute = ({ element: Component, roleRequired, ...rest }) => {
  const { isAuthenticated, isAdmin, isLabAssistant } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Role-based redirection
  if (roleRequired === "ADMIN" && !isAdmin) {
    return <Navigate to={USER_DASHBOARD_ROUTE} />;
  }

  if (roleRequired === "LABASSISTANT" && !isLabAssistant) {
    return <Navigate to={USER_DASHBOARD_ROUTE} />;
  }

  if (roleRequired === "USER" && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render component if role and authentication checks pass
  return <Component {...rest} />;
};

export default PrivateRoute;

// // PrivateRoute.js
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { USER_DASHBOARD_ROUTE } from "./AppRoutes";

// const PrivateRoute = ({ element: Element, requiredRole, ...rest }) => {
//   const { isAuthenticated, isAdmin } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (requiredRole === "ADMIN" && !isAdmin) {
//     return <Navigate to={USER_DASHBOARD_ROUTE} replace />;
//   }

//   return <Element />;
// };

// export default PrivateRoute;
