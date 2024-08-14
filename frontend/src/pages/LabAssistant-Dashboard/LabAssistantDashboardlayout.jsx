import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  LAB_USERS_ROUTE,
  HOMEVISITS_ROUTE,
  UPCOMING_APPOINTMENTS_ROUTE,
  UPDATE_SAMPLE,
  UPLOAD_REPORTS_ROUTE,
  CALLBACK_ROUTE,
} from "../../constants/AppRoutes";

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(1),
  padding: theme.spacing(1, 3),
  textTransform: "none",
  boxShadow: theme.shadows[2],
  transition: "transform 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "scale(1.05)",
  },
}));

export default function LabAssistantDashboardLayout({ children }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 10, p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
              textAlign: "center",
              color: "primary.main",
            }}
          >
            Lab Assistant Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
            }}
          >
            <StyledButton onClick={() => navigate(LAB_USERS_ROUTE)}>
              Profile
            </StyledButton>
            <StyledButton onClick={() => navigate(HOMEVISITS_ROUTE)}>
              Home Visits
            </StyledButton>
            <StyledButton onClick={() => navigate(UPCOMING_APPOINTMENTS_ROUTE)}>
              Appointments
            </StyledButton>
            <StyledButton onClick={() => navigate(UPDATE_SAMPLE)}>
              Sample Tracking
            </StyledButton>
            <StyledButton onClick={() => navigate(UPLOAD_REPORTS_ROUTE)}>
              Upload Reports
            </StyledButton>
            <StyledButton onClick={() => navigate(CALLBACK_ROUTE)}>
              Callback
            </StyledButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
