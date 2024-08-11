import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, SUPPORT_ROUTE, USER_DASHBOARD_ROUTE } from "./constants/AppRoutes";

// import { useAuth } from "./pages/Authorization"; // Import useAuth hook
// import Login from "./pages/Login";
// import UserDashboard from "./pages/UserDashboard"
// import Support from "./pages/Support"
// import Register from "./pages/Register";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
// import AppAppBar from "./components/AppAppBar";
import Register from "./pages/sign-up/SignUp";
import Login from "./pages/sign-in-side/SignInSide";
// import Blog from "./blog/Blog";
// import CheckOut from "./checkout/Checkout";
// import dashboard from "./dashboard/Dashboard";


function App() {
  // const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      {/* <AppAppBar /> */}
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        {/* <Route path={HOME_ROUTE} element={<Blog />} /> */}
        {/* <Route path={HOME_ROUTE} element={<pricing />} /> */}

        {/* <Route
          path={USER_DASHBOARD_ROUTE}
          element={isAuthenticated ? <UserDashboard /> : <Navigate to={LOGIN_ROUTE} />}
        />
        <Route path={SUPPORT_ROUTE} element={<Support />}></Route>
        <Route path={REGISTER_ROUTE} element={<Register />}></Route> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
