import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  ADMIN_DASHBOARD_ROUTE,
  LAB_ASSISTANT_DASHBOARD_ROUTE,
  USER_DASHBOARD_ROUTE,
} from "../constants/AppRoutes";
import { jwtDecode } from "jwt-decode";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [userID, setUserID] = useState(localStorage.getItem("userID") || null);

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch("https://localhost:7093/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      const { token, role } = data;

      // Decode the JWT to extract userID
      const decodedToken = jwtDecode(token);
      const fetchedUserID = decodedToken.id;

      console.log("Login Response Data:", data);
      console.log("Decoded JWT Data:", decodedToken);

      // Store the values in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userID", fetchedUserID);

      // Set the values in the context
      setIsAuthenticated(true);
      setRole(role);
      setUserID(fetchedUserID);

      // Navigate based on the role
      if (role === "ADMIN") {
        navigate(ADMIN_DASHBOARD_ROUTE);
        toast.success("Successfully logged in as Admin!");
      } else if (role === "LABASSISTANT") {
        navigate(LAB_ASSISTANT_DASHBOARD_ROUTE);
        toast.success("Successfully logged in as Lab Assistant!");
      } else {
        navigate(USER_DASHBOARD_ROUTE);
        toast.success("Successfully logged in!");
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUserID(null);
    localStorage.clear();
    navigate("/login");
    toast.info("You have been logged out.");
  };

  // Utility functions for role checks
  const isAdmin = () => role === "ADMIN";
  const isLabAssistant = () => role === "LABASSISTANT";
  const isUser = () => role === "USER";

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        userID,
        login,
        logout,
        isAdmin,
        isLabAssistant,
        isUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// import React, { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import {
//   ADMIN_DASHBOARD_ROUTE,
//   LAB_ASSISTANT_DASHBOARD_ROUTE,
//   USER_DASHBOARD_ROUTE,
// } from "../constants/AppRoutes";
// import { jwtDecode } from "jwt-decode";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );
//   const [role, setRole] = useState(localStorage.getItem("role") || null);
//   const [userID, setUserID] = useState(localStorage.getItem("userID") || null);

//   const navigate = useNavigate();

//   const login = async (email, password) => {
//     try {
//       const response = await fetch("https://localhost:7093/api/Auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText);
//       }

//       const data = await response.json();
//       const { token, role } = data;

//       // Decode the JWT to extract userID
//       const decodedToken = jwtDecode(token);
//       const fetchedUserID = decodedToken.id;

//       console.log("Login Response Data:", data);
//       console.log("Decoded JWT Data:", decodedToken);

//       // Store the values in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("userID", fetchedUserID);

//       // Set the values in the context
//       setIsAuthenticated(true);
//       setRole(role);
//       setUserID(fetchedUserID);

//       // Navigate based on the role
//       if (role === "ADMIN") {
//         navigate(ADMIN_DASHBOARD_ROUTE);
//         toast.success("Successfully logged in as Admin!");
//       } else if (role === "LABASSISTANT") {
//         navigate("/lab-assistant-dashboard");
//         toast.success("Successfully logged in as Lab Assistant!");
//       } else {
//         navigate(USER_DASHBOARD_ROUTE);
//         toast.success("Successfully logged in!");
//       }
//     } catch (error) {
//       toast.error(`Login failed: ${error.message}`);
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setRole(null);
//     setUserID(null);
//     localStorage.clear();
//     navigate("/login");
//     toast.info("You have been logged out.");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         role,
//         userID,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
