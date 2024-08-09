import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HOME_ROUTE
} from "./constants/AppRoutes";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
