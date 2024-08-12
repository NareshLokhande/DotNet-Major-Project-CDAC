import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hero from "../components/Hero";
import LogoCollection from "../components/LogoCollection";
import Highlights from "../components/Highlights";
import Pricing from "../components/Pricing";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import getHomeTheme from "./getHomeTheme";
import './../assets/css/Home.css';
import Navbar from "../components/Navbar";

export default function Home() {
  const mode = "light";
  const HomeTheme = createTheme(getHomeTheme(mode));

  return (
    <ThemeProvider theme={HomeTheme}>
      <CssBaseline />
      <Navbar />
      <Hero />
      <Box className="box">
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
