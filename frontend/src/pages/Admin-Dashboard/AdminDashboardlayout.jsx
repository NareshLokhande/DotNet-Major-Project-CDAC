import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  DEPARTMENTS_ROUTE,
  LOCATIONS_ROUTE,
  LAB_ASSISTANTS_ROUTE,
  USERS_ROUTE,
  ADMIN_REPORTS_ROUTE,
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

export default function AdminDashboardLayout({ children }) {
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
            Admin Dashboard
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
            <StyledButton onClick={() => navigate(DEPARTMENTS_ROUTE)}>
              Manage Test And Departments
            </StyledButton>
            <StyledButton onClick={() => navigate(LOCATIONS_ROUTE)}>
              Manage Locations
            </StyledButton>
            <StyledButton onClick={() => navigate(LAB_ASSISTANTS_ROUTE)}>
              Manage Lab Assistants
            </StyledButton>
            <StyledButton onClick={() => navigate(USERS_ROUTE)}>
              Manage Users
            </StyledButton>
            <StyledButton onClick={() => navigate(ADMIN_REPORTS_ROUTE)}>
              Resports and Earning
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
