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
      const fetchedUserID = decodedToken.id; // Ensure 'id' matches the userID key in your JWT

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
    localStorage.clear(); // Clears all local storage items (or remove individually if preferred)
    navigate("/login");
    toast.info("You have been logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        userID,
        login,
        logout,
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
// import jwt_decode from "jwt-decode";

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
//       const decodedToken = jwt_decode(token);
//       const fetchedUserID = decodedToken.id;

//       console.log("Login Response Data:", data);

//       // Store the values in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("isAdmin", role === "ADMIN" ? "true" : "false");
//       localStorage.setItem(
//         "isLabAssistant",
//         role === "LABASSISTANT" ? "true" : "false"
//       );
//       localStorage.setItem("isUser", role === "USER" ? "true" : "false");
//       localStorage.setItem("userID", fetchedUserID);

//       // Set the values in the context
//       setIsAuthenticated(true);
//       setIsAdmin(role === "ADMIN");
//       setIsLabAssistant(role === "LABASSISTANT");
//       setIsUser(role === "USER");
//       setUserID(fetchedUserID);

//       // Navigate based on the role
//       if (role === "ADMIN") {
//         navigate(ADMIN_DASHBOARD_ROUTE);
//         toast.success("Successfully logged in as Admin!");
//       } else if (role === "LABASSISTANT") {
//         navigate(LAB_ASSISTANT_DASHBOARD_ROUTE);
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
//     localStorage.clear(); // Clears all local storage items (or remove individually if preferred)
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

// import React, { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import {
//   ADMIN_DASHBOARD_ROUTE,
//   LAB_ASSISTANT_DASHBOARD_ROUTE,
//   USER_DASHBOARD_ROUTE,
// } from "../constants/AppRoutes";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );
//   const [isAdmin, setIsAdmin] = useState(
//     localStorage.getItem("isAdmin") === "true"
//   );
//   const [isLabAssistant, setIsLabAssistant] = useState(
//     localStorage.getItem("isLabAssistant") === "true"
//   );
//   const [isUser, setIsUser] = useState(
//     localStorage.getItem("isUser") === "true"
//   );
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
//       const { token, role, userID: fetchedUserID } = data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("isAdmin", role === "ADMIN" ? "true" : "false");
//       localStorage.setItem("isLabAssistant", role === "LABASSISTANT" ? "true" : "false");
//       localStorage.setItem("isUser", role === "USER" ? "true" : "false");
//       localStorage.setItem("userID", fetchedUserID);

//       setIsAuthenticated(true);
//       setIsAdmin(role === "ADMIN");
//       setIsLabAssistant(role === "LABASSISTANT");
//       setIsUser(role === "USER");
//       setUserID(fetchedUserID);

//       if (role === "ADMIN") {
//         navigate(ADMIN_DASHBOARD_ROUTE);
//         toast.success("Successfully logged in as Admin!");
//       } else if (role === "LABASSISTANT") {
//         navigate(LAB_ASSISTANT_DASHBOARD_ROUTE);
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
//     setIsAdmin(false);
//     setIsLabAssistant(false);
//     setIsUser(false);
//     setUserID(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("isLabAssistant");
//     localStorage.removeItem("isUser");
//     localStorage.removeItem("userID");
//     navigate("/login");
//     toast.info("You have been logged out.");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         isAdmin,
//         isLabAssistant,
//         isUser,
//         userID,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import {
//   ADMIN_DASHBOARD_ROUTE,
//   LAB_ASSISTANT_DASHBOARD_ROUTE,
//   USER_DASHBOARD_ROUTE,
// } from "../constants/AppRoutes";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {

//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );
//   const [isAdmin, setIsAdmin] = useState(
//     localStorage.getItem("isAdmin") === "true"
//   );
//   const [isLabAssistant, setIsLabAssistant] = useState(
//     localStorage.getItem("isLabAssistant") === "true"
//   );
//   const [isUser, setIsUser] = useState(
//     localStorage.getItem("isUser") === "true"
//   );

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

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("isAdmin", role === "ADMIN" ? "true" : "false");
//       localStorage.setItem(
//         "isLabAssistant",
//         role === "LABASSISTANT" ? "true" : "false"
//       );
//       localStorage.setItem("isUser", role === "USER" ? "true" : "false");

//       setIsAuthenticated(true);
//       setIsAdmin(role === "ADMIN");
//       setIsLabAssistant(role === "LABASSISTANT");
//       setIsUser(role === "USER");

//       if (role === "ADMIN") {
//         navigate(ADMIN_DASHBOARD_ROUTE);
//         toast.success("Successfully logged in as Admin!");
//       } else if (role === "LABASSISTANT") {
//         navigate(LAB_ASSISTANT_DASHBOARD_ROUTE);
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
//     setIsAdmin(false);
//     setIsLabAssistant(false);
//     setIsUser(false);
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("isLabAssistant");
//     localStorage.removeItem("isUser");
//     navigate("/login");
//     toast.info("You have been logged out.");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         isAdmin,
//         isLabAssistant,
//         isUser,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ADMIN_DASHBOARD_ROUTE, USER_DASHBOARD_ROUTE } from "../constants/AppRoutes";
// import { toast } from "react-toastify"; // Import toast
// import "react-toastify/dist/ReactToastify.css"; // Import toast styles

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   // Initialize authentication state
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );
//   const [isAdmin, setIsAdmin] = useState(
//     localStorage.getItem("isAdmin") === "true"
//   ); // Admin role flag

//   const navigate = useNavigate();

//   // Login function
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

//       // Store the token and role
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       // Store the authentication state and role in localStorage
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("isAdmin", role === "ADMIN");

//       // Set state based on role
//       setIsAuthenticated(true);
//       setIsAdmin(role === "ADMIN");

//       // Navigate to the appropriate dashboard
//       if (role === "ADMIN") {
//         navigate(`${ADMIN_DASHBOARD_ROUTE}`);
//         toast.success("Successfully logged in as Admin!");
//       } else {
//         navigate(`${USER_DASHBOARD_ROUTE}`);
//         toast.success("Successfully logged in!");
//       }
//     } catch (error) {
//       toast.error(`Login failed: ${error.message}`);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     setIsAuthenticated(false);
//     setIsAdmin(false);
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("isAdmin");
//     navigate("/login");
//     toast.info("You have been logged out.");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

//Without JWT storage
// import React, { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { USER_DASHBOARD_ROUTE } from "../constants/AppRoutes";
// import { toast } from "react-toastify"; // Import toast
// import "react-toastify/dist/ReactToastify.css"; // Import toast styles

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   // Initialize authentication state
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );
//   const [isAdmin, setIsAdmin] = useState(
//     localStorage.getItem("isAdmin") === "true"
//   ); // Admin role flag

//   const navigate = useNavigate();

//   // Login function
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
//       const { role } = data;

//       if (role === "ADMIN") {
//         setIsAuthenticated(true);
//         setIsAdmin(true);
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("isAdmin", "true");
//         navigate(`${USER_DASHBOARD_ROUTE}`);
//         toast.success("Successfully logged in as Admin!");
//       } else {
//         setIsAuthenticated(true);
//         setIsAdmin(false);
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("isAdmin", "false");
//         navigate(`${USER_DASHBOARD_ROUTE}`);
//         toast.success("Successfully logged in!");
//       }
//     } catch (error) {
//       toast.error(`Login failed: ${error.message}`);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     setIsAuthenticated(false);
//     setIsAdmin(false);
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("isAdmin");
//     navigate("/login");
//     toast.info("You have been logged out.");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
