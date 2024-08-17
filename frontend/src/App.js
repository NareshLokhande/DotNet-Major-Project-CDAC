import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_REPORTS_ROUTE,
  APPOINTMENTS_ROUTE,
  CALLBACK_ROUTE,
  DEPARTMENTS_ROUTE,
  HOME_ROUTE,
  LAB_ASSISTANT_DASHBOARD_ROUTE,
  LAB_ASSISTANTS_ROUTE,
  LAB_USERS_ROUTE,
  LOCATIONS_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SAMPLE_TRACKING_ROUTE,
  TESTS_ROUTE,
  UPCOMING_APPOINTMENTS_ROUTE,
  UPDATE_SAMPLE,
  UPLOAD_REPORTS_ROUTE,
  USER_DASHBOARD_ROUTE,
  USER_REPORTS_ROUTE,
  USERS_ROUTE,
} from "./constants/AppRoutes";
import Home from "./pages/Home";
import Register from "./pages/sign-up/SignUp";
import Login from "./pages/sign-in-side/SignInSide";
import AppointmentBooking from "./pages/User-Dashboard/AppointmentsBooking";
import UserDashboard from "./pages/User-Dashboard/UserDashboard";
import Profile from "./pages/User-Dashboard/Profile";
import SampleTracking from "./pages/User-Dashboard/SampleTracking";
import Reports from "./pages/User-Dashboard/Reports";
import Navbar from "./components/Navbar";
import AdminDashboardLayout from "./pages/Admin-Dashboard/AdminDashboardlayout";
import ManageLocations from "./pages/Admin-Dashboard/ManageLocations";
import ManageTestAndDept from "./pages/Admin-Dashboard/ManageTestAndDept";
import ManageLabAssistant from "./pages/Admin-Dashboard/ManageLabAssistant";
import ManageUsers from "./pages/Admin-Dashboard/ManageUsers";
import ReportsAndEarnings from "./pages/Admin-Dashboard/ReportsAndEarnings";
import LabAssistantDashboardLayout from "./pages/LabAssistant-Dashboard/LabAssistantDashboardlayout";
import LabAssistantProfile from "./pages/LabAssistant-Dashboard/LabAssistantProfile";
import UpcomingAppointments from "./pages/LabAssistant-Dashboard/UpcomingAppointments";
import UpdateSample from "./pages/LabAssistant-Dashboard/UpdateSample";
import Callback from "./pages/LabAssistant-Dashboard/Callback";
import UploadReports from "./pages/LabAssistant-Dashboard/UploadReports";
import TestsPage from "./components/TestCard";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./constants/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div style={{ marginTop: "10px" }}>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />

          <Route
            path={ADMIN_DASHBOARD_ROUTE}
            element={
              <PrivateRoute
                element={AdminDashboardLayout}
                requiredRole="ADMIN"
              />
            }
          />
          <Route
            path={USER_DASHBOARD_ROUTE}
            element={
              <PrivateRoute element={UserDashboard} requiredRole="PATIENT" />
            }
          />

          <Route
            path={APPOINTMENTS_ROUTE}
            element={
              <PrivateRoute
                element={AppointmentBooking}
                requiredRole="PATIENT"
              />
            }
          />
          <Route
            path={PROFILE_ROUTE}
            element={<PrivateRoute element={Profile} requiredRole="PATIENT" />}
          />
          <Route
            path={SAMPLE_TRACKING_ROUTE}
            element={
              <PrivateRoute element={SampleTracking} requiredRole="PATIENT" />
            }
          />
          <Route
            path={USER_REPORTS_ROUTE}
            element={<PrivateRoute element={Reports} requiredRole="PATIENT" />}
          />
          <Route
            path={TESTS_ROUTE}
            element={<PrivateRoute element={TestsPage} />}
          />
          <Route
            path={LOCATIONS_ROUTE}
            element={<PrivateRoute element={ManageLocations} />}
          />
          <Route
            path={DEPARTMENTS_ROUTE}
            element={
              <PrivateRoute element={ManageTestAndDept} requiredRole="ADMIN" />
            }
          />
          <Route
            path={LAB_ASSISTANTS_ROUTE}
            element={
              <PrivateRoute element={ManageLabAssistant} requiredRole="ADMIN" />
            }
          />
          <Route
            path={USERS_ROUTE}
            element={
              <PrivateRoute element={ManageUsers} requiredRole="ADMIN" />
            }
          />
          <Route
            path={ADMIN_REPORTS_ROUTE}
            element={
              <PrivateRoute element={ReportsAndEarnings} requiredRole="ADMIN" />
            }
          />
          <Route
            path={LAB_ASSISTANT_DASHBOARD_ROUTE}
            element={
              <PrivateRoute
                element={LabAssistantDashboardLayout}
                roleRequired="LABASSISTANT"
              />
            }
          />
          <Route
            path={LAB_USERS_ROUTE}
            element={
              <PrivateRoute
                element={LabAssistantProfile}
                roleRequired="LABASSISTANT"
              />
            }
          />
          <Route
            path={UPCOMING_APPOINTMENTS_ROUTE}
            element={
              <PrivateRoute
                element={UpcomingAppointments}
                roleRequired="LABASSISTANT"
              />
            }
          />
          <Route
            path={UPDATE_SAMPLE}
            element={
              <PrivateRoute
                element={UpdateSample}
                roleRequired="LABASSISTANT"
              />
            }
          />
          <Route
            path={UPLOAD_REPORTS_ROUTE}
            element={
              <PrivateRoute
                element={UploadReports}
                roleRequired="LABASSISTANT"
              />
            }
          />
          <Route
            path={CALLBACK_ROUTE}
            element={
              <PrivateRoute element={Callback} roleRequired="LABASSISTANT" />
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import { ADMIN_DASHBOARD_ROUTE, ADMIN_REPORTS_ROUTE, APPOINTMENTS_ROUTE, CALLBACK_ROUTE, DEPARTMENTS_ROUTE, HOME_ROUTE, HOMEVISITS_ROUTE, LAB_ASSISTANT_DASHBOARD_ROUTE, LAB_ASSISTANTS_ROUTE, LAB_USERS_ROUTE, LOCATIONS_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, SAMPLE_TRACKING_ROUTE, TESTS_ROUTE, UPCOMING_APPOINTMENTS_ROUTE, UPDATE_SAMPLE, UPLOAD_REPORTS_ROUTE, USER_DASHBOARD_ROUTE, USER_REPORTS_ROUTE, USERS_ROUTE } from "./constants/AppRoutes";
// import Home from "./pages/Home";
// import Register from "./pages/sign-up/SignUp";
// import Login from "./pages/sign-in-side/SignInSide";
// import AppointmentBooking from "./pages/User-Dashboard/AppointmentsBooking";
// import UserDashboard from "./pages/User-Dashboard/UserDashboard";
// import Profile from "./pages/User-Dashboard/Profile";
// import SampleTracking from "./pages/User-Dashboard/SampleTracking";
// import Reports from "./pages/User-Dashboard/Reports";
// import Navbar from "./components/Navbar";
// import AdminDashboardLayout from "./pages/Admin-Dashboard/AdminDashboardlayout";
// import ManageLocations from "./pages/Admin-Dashboard/ManageLocations";
// import ManageTestAndDept from "./pages/Admin-Dashboard/ManageTestAndDept";
// import ManageLabAssistant from "./pages/Admin-Dashboard/ManageLabAssistant";
// import ManageUsers from "./pages/Admin-Dashboard/ManageUsers";
// import ReportsAndEarnings from "./pages/Admin-Dashboard/ReportsAndEarnings";
// import LabAssistantDashboardLayout from "./pages/LabAssistant-Dashboard/LabAssistantDashboardlayout";
// import LabAssistantProfile from "./pages/LabAssistant-Dashboard/LabAssistantProfile";
// import HomeVisits from "./pages/LabAssistant-Dashboard/HomeVisits";
// import UpcomingAppointments from "./pages/LabAssistant-Dashboard/UpcomingAppointments";
// import UpdateSample from "./pages/LabAssistant-Dashboard/UpdateSample";
// import Callback from "./pages/LabAssistant-Dashboard/Callback";
// import UploadReports from "./pages/LabAssistant-Dashboard/UploadReports";
// import TestsPage from "./components/TestCard";

// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./constants/PrivateRoute";

// function App() {
//   return (
//     <AuthProvider>
//         <Navbar />
//         <div style={{ marginTop: "10px" }}>
//           <Routes>
//             <Route path={LOGIN_ROUTE} element={<Login />} />
//             <PrivateRoute
//               path={ADMIN_DASHBOARD_ROUTE}
//               element={<AdminDashboardLayout />}
//             />
//             <PrivateRoute
//               path={USER_DASHBOARD_ROUTE}
//               element={<UserDashboard />}
//             />

//             <Route path={HOME_ROUTE} element={<Home />} />
//             <Route path={REGISTER_ROUTE} element={<Register />} />

//             <Route path={USER_DASHBOARD_ROUTE} element={<UserDashboard />} />
//             <Route path={APPOINTMENTS_ROUTE} element={<AppointmentBooking />} />
//             <Route path={PROFILE_ROUTE} element={<Profile />} />
//             <Route path={SAMPLE_TRACKING_ROUTE} element={<SampleTracking />} />
//             <Route path={USER_REPORTS_ROUTE} element={<Reports />} />
//             <Route path={TESTS_ROUTE} element={<TestsPage />} />

//             <Route
//               path={ADMIN_DASHBOARD_ROUTE}
//               element={<AdminDashboardLayout />}
//             />
//             <Route path={LOCATIONS_ROUTE} element={<ManageLocations />} />
//             <Route path={DEPARTMENTS_ROUTE} element={<ManageTestAndDept />} />
//             <Route
//               path={LAB_ASSISTANTS_ROUTE}
//               element={<ManageLabAssistant />}
//             />
//             <Route path={USERS_ROUTE} element={<ManageUsers />} />
//             <Route
//               path={ADMIN_REPORTS_ROUTE}
//               element={<ReportsAndEarnings />}
//             />

//             <Route
//               path={LAB_ASSISTANT_DASHBOARD_ROUTE}
//               element={<LabAssistantDashboardLayout />}
//             />
//             <Route path={LAB_USERS_ROUTE} element={<LabAssistantProfile />} />
//             <Route path={HOMEVISITS_ROUTE} element={<HomeVisits />} />
//             <Route
//               path={UPCOMING_APPOINTMENTS_ROUTE}
//               element={<UpcomingAppointments />}
//             />
//             <Route path={UPDATE_SAMPLE} element={<UpdateSample />} />
//             <Route path={UPLOAD_REPORTS_ROUTE} element={<UploadReports />} />
//             <Route path={CALLBACK_ROUTE} element={<Callback />} />

//             {/* <Route path={USER_DASHBOARD_ROUTE} element={isAuthenticated ? <UserDashboard /> : <Navigate to={LOGIN_ROUTE} />}/>
//         <Route path={APPOINTMENTS_ROUTE} element={ isAuthenticated ? <AppointmentBooking /> : <Navigate to={LOGIN_ROUTE}/>} />
//         <Route path={PROFILE_ROUTE} element={isAuthenticated ? <Profile /> : <Navigate to={LOGIN_ROUTE}/>} />
//         <Route path={SAMPLE_TRACKING_ROUTE} element={ isAuthenticated ? <SampleTracking /> : <Navigate to={LOGIN_ROUTE}/>} />
//         <Route path={REPORTS_ROUTE} element={ isAuthenticated ? <Reports /> : <Navigate to={LOGIN_ROUTE} />} /> */}
//           </Routes>
//         </div>
//     </AuthProvider>
//   );
// }

// export default App;
