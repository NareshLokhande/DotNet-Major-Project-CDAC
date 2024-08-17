import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MuiCard from "@mui/material/Card";
import { ADMIN_DASHBOARD_ROUTE, REGISTER_ROUTE, USER_DASHBOARD_ROUTE } from "../../constants/AppRoutes";
import { Link as RouterLink } from "react-router-dom";
import MedLabIcon from "../../components/MedLabIcon";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  gap: theme.spacing(4),
  width: "100%",
  padding: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
  }),
}));

export default function SignInCard() {
  const { login } = useAuth(); // Use the authentication context
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <MedLabIcon />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            placeholder="••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Link
           variant="body2"
           sx={{ alignSelf: "center" }}
           to={REGISTER_ROUTE}
           component={RouterLink}
         >
           Don&apos;t have an account? Sign up
         </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
