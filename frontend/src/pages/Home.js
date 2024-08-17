import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Box, Divider} from "@mui/material";
import Hero from "../components/Hero";
import LogoCollection from "../components/LogoCollection";
import Highlights from "../components/Highlights";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import getHomeTheme from "./getHomeTheme";
import './../assets/css/Home.css';
import TestsPage from "../components/TestCard";

export default function Home() {
  const mode = "light";
  const HomeTheme = createTheme(getHomeTheme(mode));

  return (
    <ThemeProvider theme={HomeTheme}>
      <CssBaseline />
      <Navbar />
      <Hero />
      <Box className="box">
        <TestsPage />
        <Divider />
        <LogoCollection />
        <Divider />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
