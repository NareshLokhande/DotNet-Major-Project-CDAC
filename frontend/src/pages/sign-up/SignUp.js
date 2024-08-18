import React from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControlLabel,
  Link,
  Radio,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import getSignUpTheme from "./getSignUpTheme";
import { LOGIN_ROUTE } from "../../constants/AppRoutes";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "auto",
  paddingBottom: theme.spacing(12),
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.up("sm")]: {
    paddingBottom: 0,
    height: "100dvh",
  },
}));

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required."),
  role: Yup.string().required("Role is required."),
  name: Yup.string().required("Name is required."),
});

export default function SignUp() {
  const SignUpTheme = createTheme(getSignUpTheme());
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password, name, role } = values;
    console.log("Form values before sending:", values);

    const endpoint =
      role === "LABASSISTANT"
        ? `${process.env.REACT_APP_API_BASE_URL}/Auth/register-lab-assistant`
        : `${process.env.REACT_APP_API_BASE_URL}/Auth/register-patient`;

    try {
      const response = await fetch(
        endpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },        
          body: JSON.stringify({
            email,
            password,
            name,
            role, 
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Success:", data);

      // Show success message
      toast.success("Sign up successful! Redirecting to sign in...");

      // Redirect to sign in page after a short delay
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 2000); 
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Sign up failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: "center",
            height: { xs: "100%", sm: "100dvh" },
            p: 2,
          }}
        >
          <Card>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign up
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
                name: "",
                role: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Field
                      as={TextField}
                      name="name"
                      type="text"
                      label="Name"
                      placeholder="Your Name"
                      fullWidth
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <Field
                      as={TextField}
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="your@email.com"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      as={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="••••••"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="body1">Select your Role:</Typography>
                      <FormControlLabel
                        control={
                          <Field
                            type="radio"
                            name="role"
                            value="LABASSISTANT"
                            as={Radio}
                          />
                        }
                        label="Lab Assistant"
                      />
                      <FormControlLabel
                        control={
                          <Field
                            type="radio"
                            name="role"
                            value="PATIENT"
                            as={Radio}
                          />
                        }
                        label="Patient"
                      />
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing up..." : "Sign up"}
                    </Button>
                    <Link
                      href={LOGIN_ROUTE}
                      variant="body2"
                      sx={{ alignSelf: "center" }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Box>
                </Form>
              )}
            </Formik>
          </Card>
        </Stack>
      </SignUpContainer>
      <ToastContainer />
    </ThemeProvider>
  );
}
