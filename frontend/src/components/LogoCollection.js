import * as React from "react";
import { Box, Typography, Grid } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import MasksOutlinedIcon from "@mui/icons-material/MasksOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

const icons = [
  <BiotechIcon style={{ fontSize: 60 }} />,
  <LocalHospitalOutlinedIcon style={{ fontSize: 60 }} />,
  <MasksOutlinedIcon style={{ fontSize: 60 }} />,
  <HealingOutlinedIcon style={{ fontSize: 60 }} />,
  <ScienceOutlinedIcon style={{ fontSize: 60 }} />,
  <BloodtypeOutlinedIcon style={{ fontSize: 60 }} />,
  <VaccinesOutlinedIcon style={{ fontSize: 60 }} />,
];

export default function LogoCollection() {
  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="h4"
        variant=""
        align="center"
        sx={{ color: "text.secondary" }}
      >
        Trusted by Healthcare Professionals and Patients
      </Typography>
      <Grid container sx={{ justifyContent: "center", mt: 4, opacity: 0.8 }}>
        {icons.map((icon, index) => (
          <Grid item key={index} sx={{ mx: 2 }}>
            {icon}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
