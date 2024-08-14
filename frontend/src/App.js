import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { APPOINTMENTS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, REPORTS_ROUTE, SAMPLE_TRACKING_ROUTE, USER_DASHBOARD_ROUTE } from "./constants/AppRoutes";

// import { useAuth } from "./pages/Authorization"; // Import useAuth hook
import Home from "./pages/Home";
import Register from "./pages/sign-up/SignUp";
import Login from "./pages/sign-in-side/SignInSide";
import AppointmentBooking from "./pages/AppointmentsBooking";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import SampleTracking from "./pages/SampleTracking";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";


function App() {
  // const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{marginTop:'100px'}}>
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />

          <Route path={USER_DASHBOARD_ROUTE} element={<UserDashboard />} />
          <Route path={APPOINTMENTS_ROUTE} element={<AppointmentBooking />} />
          <Route path={PROFILE_ROUTE} element={<Profile />} />
          <Route path={SAMPLE_TRACKING_ROUTE} element={<SampleTracking />} />
          <Route path={REPORTS_ROUTE} element={<Reports />} />

          {/* <Route path={USER_DASHBOARD_ROUTE} element={isAuthenticated ? <UserDashboard /> : <Navigate to={LOGIN_ROUTE} />}/>
        <Route path={APPOINTMENTS_ROUTE} element={ isAuthenticated ? <AppointmentBooking /> : <Navigate to={LOGIN_ROUTE}/>} />
        <Route path={PROFILE_ROUTE} element={isAuthenticated ? <Profile /> : <Navigate to={LOGIN_ROUTE}/>} />
        <Route path={SAMPLE_TRACKING_ROUTE} element={ isAuthenticated ? <SampleTracking /> : <Navigate to={LOGIN_ROUTE}/>} />
        <Route path={REPORTS_ROUTE} element={ isAuthenticated ? <Reports /> : <Navigate to={LOGIN_ROUTE} />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
