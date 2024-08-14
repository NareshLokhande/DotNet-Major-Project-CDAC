import React from "react";
import {
  Box,
  Button,
  Checkbox,
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
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import getSignUpTheme from "./getSignUpTheme";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../constants/AppRoutes";
import MedLabIcon, { GoogleIcon } from "../../components/MedLabIcon";
import { getRoleValue } from "../../utils/rolemapping"; // Import utility

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
  UserRole: Yup.string().required("UserRole is required."),
});

export default function SignUp() {
  const SignUpTheme = createTheme(getSignUpTheme());

  const handleSubmit = async (values, { setSubmitting }) => {
    // Convert UserRole to corresponding integer value
    const roleValue = getRoleValue(values.UserRole);

    // Create a new values object with converted UserRole
    const payload = {
      ...values,
      UserRole: roleValue,
    };

    console.log("Form values before sending:", payload);

    try {
      const response = await fetch("https://localhost:7150/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get raw response text
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorText}`
        );
      }

      const data = await response.json(); // Attempt to parse JSON
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error.message); // Log error message only
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            position: { xs: "static", sm: "fixed" },
            width: "100%",
            p: { xs: 2, sm: 4 },
          }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            component="a"
            href={HOME_ROUTE}
          >
            Back
          </Button>
        </Stack>
        <Stack
          sx={{
            justifyContent: "center",
            height: { xs: "100%", sm: "100dvh" },
            p: 2,
          }}
        >
          <Card>
            <Link
              to={HOME_ROUTE}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <MedLabIcon />
            </Link>
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
                UserRole: "",
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
                      <Typography variant="body1">
                        Select your UserRole:
                      </Typography>
                      <FormControlLabel
                        control={
                          <Field
                            type="radio"
                            name="UserRole"
                            value="ADMIN"
                            as={Radio}
                          />
                        }
                        label="Admin"
                      />
                      <FormControlLabel
                        control={
                          <Field
                            type="radio"
                            name="UserRole"
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
                            name="UserRole"
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert("Sign up with Google")}
                startIcon={<GoogleIcon />}
              >
                Sign up with Google
              </Button>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}

// import React from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   CssBaseline,
//   FormControlLabel,
//   Link,
//   Radio,
//   TextField,
//   Typography,
//   Stack,
//   Card as MuiCard,
// } from "@mui/material";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import getSignUpTheme from "./getSignUpTheme";
// import { HOME_ROUTE, LOGIN_ROUTE } from "../../constants/AppRoutes";
// import MedLabIcon, { GoogleIcon } from "../../components/MedLabIcon";

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignSelf: "center",
//   gap: theme.spacing(4),
//   width: "100%",
//   padding: theme.spacing(2),
//   boxShadow:
//     "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
//   [theme.breakpoints.up("sm")]: {
//     padding: theme.spacing(4),
//     width: "450px",
//   },
// }));

// const SignUpContainer = styled(Stack)(({ theme }) => ({
//   height: "auto",
//   paddingBottom: theme.spacing(12),
//   backgroundImage:
//     "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//   backgroundRepeat: "no-repeat",
//   [theme.breakpoints.up("sm")]: {
//     paddingBottom: 0,
//     height: "100dvh",
//   },
// }));

// const SignUpSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email address.")
//     .required("Email is required."),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters long.")
//     .required("Password is required."),
//   UserRole: Yup.string().required("UserRole is required."),
// });

// export default function SignUp() {
//   const SignUpTheme = createTheme(getSignUpTheme());

// const handleSubmit = async (values, { setSubmitting }) => {
//   console.log("Form values before sending:", values); // Check if UserRole is present
//   try {
//     const response = await fetch("https://localhost:7150/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     if (!response.ok) {
//       const errorText = await response.text(); // Get raw response text
//       throw new Error(
//         `HTTP error! status: ${response.status}, details: ${errorText}`
//       );
//     }

//     const data = await response.json(); // Attempt to parse JSON
//     console.log("Success:", data);

//     // Handle success, like redirecting to a different page or showing a success message
//   } catch (error) {
//     console.error("Error:", error.message); // Log error message only
//     // Handle errors, such as showing an error message
//   } finally {
//     setSubmitting(false);
//   }
// };

//   return (
//     <ThemeProvider theme={SignUpTheme}>
//       <CssBaseline />
//       <SignUpContainer direction="column" justifyContent="space-between">
//         <Stack
//           direction="row"
//           sx={{
//             justifyContent: "space-between",
//             position: { xs: "static", sm: "fixed" },
//             width: "100%",
//             p: { xs: 2, sm: 4 },
//           }}
//         >
//           <Button
//             startIcon={<ArrowBackRoundedIcon />}
//             component="a"
//             href={HOME_ROUTE}
//           >
//             Back
//           </Button>
//         </Stack>
//         <Stack
//           sx={{
//             justifyContent: "center",
//             height: { xs: "100%", sm: "100dvh" },
//             p: 2,
//           }}
//         >
//           <Card>
//             <Link
//               to={HOME_ROUTE}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 textDecoration: "none",
//               }}
//             >
//               <MedLabIcon />
//             </Link>
//             <Typography
//               component="h1"
//               variant="h4"
//               sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
//             >
//               Sign up
//             </Typography>
//             <Formik
//               initialValues={{
//                 email: "",
//                 password: "",
//                 UserRole: "",
//               }}
//               validationSchema={SignUpSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched, isSubmitting }) => (
//                 <Form>
//                   <Box
//                     sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//                   >
//                     <Field
//                       as={TextField}
//                       name="email"
//                       type="email"
//                       label="Email"
//                       placeholder="your@email.com"
//                       fullWidth
//                       error={touched.email && Boolean(errors.email)}
//                       helperText={touched.email && errors.email}
//                     />
//                     <Field
//                       as={TextField}
//                       name="password"
//                       type="password"
//                       label="Password"
//                       placeholder="••••••"
//                       fullWidth
//                       error={touched.password && Boolean(errors.password)}
//                       helperText={touched.password && errors.password}
//                     />
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//                     >
//                       <Typography variant="body1">
//                         Select your UserRole:
//                       </Typography>
//                       <FormControlLabel
//                         control={
//                           <Field
//                             type="radio"
//                             name="UserRole"
//                             value="ADMIN"
//                             as={Radio}
//                           />
//                         }
//                         label="Admin"
//                       />
//                       <FormControlLabel
//                         control={
//                           <Field
//                             type="radio"
//                             name="UserRole"
//                             value="LABASSISTANT"
//                             as={Radio}
//                           />
//                         }
//                         label="Lab Assistant"
//                       />
//                       <FormControlLabel
//                         control={
//                           <Field
//                             type="radio"
//                             name="UserRole"
//                             value="PATIENT"
//                             as={Radio}
//                           />
//                         }
//                         label="Patient"
//                       />
//                     </Box>
//                     <Button
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Signing up..." : "Sign up"}
//                     </Button>
//                     <Link
//                       href={LOGIN_ROUTE}
//                       variant="body2"
//                       sx={{ alignSelf: "center" }}
//                     >
//                       Already have an account? Sign in
//                     </Link>
//                   </Box>
//                 </Form>
//               )}
//             </Formik>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <Button
//                 type="button"
//                 fullWidth
//                 variant="outlined"
//                 color="secondary"
//                 onClick={() => alert("Sign up with Google")}
//                 startIcon={<GoogleIcon />}
//               >
//                 Sign up with Google
//               </Button>
//             </Box>
//           </Card>
//         </Stack>
//       </SignUpContainer>
//     </ThemeProvider>
//   );
// }

// import React from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   CssBaseline,
//   FormControlLabel,
//   Link,
//   TextField,
//   Typography,
//   Stack,
//   Card as MuiCard,
//   Radio,
// } from "@mui/material";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import getSignUpTheme from "./getSignUpTheme";
// import { HOME_ROUTE, LOGIN_ROUTE } from "../../constants/AppRoutes";
// import MedLabIcon, { GoogleIcon } from "../../components/MedLabIcon";

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignSelf: "center",
//   gap: theme.spacing(4),
//   width: "100%",
//   padding: theme.spacing(2),
//   boxShadow:
//     "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
//   [theme.breakpoints.up("sm")]: {
//     padding: theme.spacing(4),
//     width: "450px",
//   },
// }));

// const SignUpContainer = styled(Stack)(({ theme }) => ({
//   height: "auto",
//   paddingBottom: theme.spacing(12),
//   backgroundImage:
//     "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//   backgroundRepeat: "no-repeat",
//   [theme.breakpoints.up("sm")]: {
//     paddingBottom: 0,
//     height: "100dvh",
//   },
// }));

// const SignUpSchema = Yup.object().shape({
//   // name: Yup.string().required("Name is required.").min(2, "Name is too short."),
//   email: Yup.string()
//     .email("Invalid email address.")
//     .required("Email is required."),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters long.")
//     .required("Password is required."),
//   role: Yup.string().required("Role is required."),
// });

// export default function SignUp() {
//   const SignUpTheme = createTheme(getSignUpTheme());

// const handleSubmit = async (values, { setSubmitting }) => {
//   try {
//     const response = await fetch("https://localhost:7150/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     if (!response.ok) {
//       const errorDetails = await response.text();
//       throw new Error(
//         `HTTP error! status: ${response.status}, details: ${errorDetails}`
//       );
//     }

//     const data = await response.json();
//     console.log("Success:", data);

//     // Handle success, like redirecting to a different page or showing a success message
//   } catch (error) {
//     console.error("Error:", error);
//     // Handle errors, such as showing an error message
//   } finally {
//     setSubmitting(false);
//   }
// };

//   return (
//     <ThemeProvider theme={SignUpTheme}>
//       <CssBaseline />
//       <SignUpContainer direction="column" justifyContent="space-between">
//         <Stack
//           direction="row"
//           sx={{
//             justifyContent: "space-between",
//             position: { xs: "static", sm: "fixed" },
//             width: "100%",
//             p: { xs: 2, sm: 4 },
//           }}
//         >
//           <Button
//             startIcon={<ArrowBackRoundedIcon />}
//             component="a"
//             href={HOME_ROUTE}
//           >
//             Back
//           </Button>
//         </Stack>
//         <Stack
//           sx={{
//             justifyContent: "center",
//             height: { xs: "100%", sm: "100dvh" },
//             p: 2,
//           }}
//         >
//           <Card>
//             <Link
//               to={HOME_ROUTE}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 textDecoration: "none",
//               }}
//             >
//               <MedLabIcon />
//             </Link>
//             <Typography
//               component="h1"
//               variant="h4"
//               sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
//             >
//               Sign up
//             </Typography>
//             <Formik
//               initialValues={{
//                 email: "",
//                 password: "",
//                 role: "",
//               }}
//               validationSchema={SignUpSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched, isSubmitting }) => (
//                 <Form>
//                   <Box
//                     sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//                   >
//                     {/* <Field
//                       as={TextField}
//                       name="name"
//                       type="text"
//                       label="Full name"
//                       placeholder="Jon Snow"
//                       fullWidth
//                       error={touched.name && Boolean(errors.name)}
//                       helperText={touched.name && errors.name}
//                     /> */}
//                     <Field
//                       as={Box}
//                       sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//                     >
//                       <Typography variant="body1">Select your role:</Typography>
//                       <FormControlLabel
//                         control={
//                           <Field
//                             type="radio"
//                             name="role"
//                             value="ADMIN"
//                             as={Radio}
//                           />
//                         }
//                         label="Admin"
//                       />
//                       <FormControlLabel
//                         control={
//                           <Field
//                             type="radio"
//                             name="role"
//                             value="LABASSISTANT"
//                             as={Radio}
//                           />
//                         }
//                         label="Lab Assistant"
//                       />
//                       <FormControlLabel
//                         control={
//                           <Field
//                             type="radio"
//                             name="role"
//                             value="PATIENT"
//                             as={Radio}
//                           />
//                         }
//                         label="Patient"
//                       />
//                     </Field>

//                     <Field
//                       as={TextField}
//                       name="email"
//                       type="email"
//                       label="Email"
//                       placeholder="your@email.com"
//                       fullWidth
//                       error={touched.email && Boolean(errors.email)}
//                       helperText={touched.email && errors.email}
//                     />
//                     <Field
//                       as={TextField}
//                       name="password"
//                       type="password"
//                       label="Password"
//                       placeholder="••••••"
//                       fullWidth
//                       error={touched.password && Boolean(errors.password)}
//                       helperText={touched.password && errors.password}
//                     />
//                     {/* <FormControlLabel
//                       control={<Field as={Checkbox} name="allowExtraEmails" />}
//                       label="I want to receive updates via email."
//                     /> */}
//                     <Button
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Signing up..." : "Sign up"}
//                     </Button>
//                     <Link
//                       href={LOGIN_ROUTE}
//                       variant="body2"
//                       sx={{ alignSelf: "center" }}
//                     >
//                       Already have an account? Sign in
//                     </Link>
//                   </Box>
//                 </Form>
//               )}
//             </Formik>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <Button
//                 type="button"
//                 fullWidth
//                 variant="outlined"
//                 color="secondary"
//                 onClick={() => alert("Sign up with Google")}
//                 startIcon={<GoogleIcon />}
//               >
//                 Sign up with Google
//               </Button>
//             </Box>
//           </Card>
//         </Stack>
//       </SignUpContainer>
//     </ThemeProvider>
//   );
// }

// import React from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   CssBaseline,
//   FormControlLabel,
//   Link,
//   TextField,
//   Typography,
//   Stack,
//   Card as MuiCard,
// } from "@mui/material";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import getSignUpTheme from "./getSignUpTheme";
// import { HOME_ROUTE, LOGIN_ROUTE } from "../../constants/AppRoutes";
// import MedLabIcon, { GoogleIcon } from "../../components/MedLabIcon";

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignSelf: "center",
//   gap: theme.spacing(4),
//   width: "100%",
//   padding: theme.spacing(2),
//   boxShadow:
//     "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
//   [theme.breakpoints.up("sm")]: {
//     padding: theme.spacing(4),
//     width: "450px",
//   },
// }));

// const SignUpContainer = styled(Stack)(({ theme }) => ({
//   height: "auto",
//   paddingBottom: theme.spacing(12),
//   backgroundImage:
//     "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//   backgroundRepeat: "no-repeat",
//   [theme.breakpoints.up("sm")]: {
//     paddingBottom: 0,
//     height: "100dvh",
//   },
// }));

// const SignUpSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required.").min(1, "Name is too short."),
//   email: Yup.string()
//     .email("Invalid email address.")
//     .required("Email is required."),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters long.")
//     .required("Password is required."),
// });

// export default function SignUp() {
//   const [mode, setMode] = React.useState("light");
//   const SignUpTheme = createTheme(getSignUpTheme(mode));

//   return (
//     <ThemeProvider theme={SignUpTheme}>
//       <CssBaseline />
//       <SignUpContainer direction="column" justifyContent="space-between">
//         <Stack
//           direction="row"
//           sx={{
//             justifyContent: "space-between",
//             position: { xs: "static", sm: "fixed" },
//             width: "100%",
//             p: { xs: 2, sm: 4 },
//           }}
//         >
//           <Button
//             startIcon={<ArrowBackRoundedIcon />}
//             component="a"
//             href={HOME_ROUTE}
//           >
//             Back
//           </Button>
//         </Stack>
//         <Stack
//           sx={{
//             justifyContent: "center",
//             height: { xs: "100%", sm: "100dvh" },
//             p: 2,
//           }}
//         >
//           <Card>
//             <Link
//               to={HOME_ROUTE}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 textDecoration: "none",
//               }}
//             >
//               <MedLabIcon />
//             </Link>
//             <Typography
//               component="h1"
//               variant="h4"
//               sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
//             >
//               Sign up
//             </Typography>
//             <Formik
//               initialValues={{
//                 name: "",
//                 email: "",
//                 password: "",
//                 allowExtraEmails: false,
//               }}
//               validationSchema={SignUpSchema}
//               onSubmit={(values) => {
//                 console.log(values);
//               }}
//             >
//               {({ errors, touched, isSubmitting }) => (
//                 <Form>
//                   <Box
//                     sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//                   >
//                     <Field
//                       as={TextField}
//                       name="name"
//                       type="text"
//                       label="Full name"
//                       placeholder="Jon Snow"
//                       fullWidth
//                       error={touched.name && Boolean(errors.name)}
//                       helperText={touched.name && errors.name}
//                     />
//                     <Field
//                       as={TextField}
//                       name="email"
//                       type="email"
//                       label="Email"
//                       placeholder="your@email.com"
//                       fullWidth
//                       error={touched.email && Boolean(errors.email)}
//                       helperText={touched.email && errors.email}
//                     />
//                     <Field
//                       as={TextField}
//                       name="password"
//                       type="password"
//                       label="Password"
//                       placeholder="••••••"
//                       fullWidth
//                       error={touched.password && Boolean(errors.password)}
//                       helperText={touched.password && errors.password}
//                     />
//                     <FormControlLabel
//                       control={<Field as={Checkbox} name="allowExtraEmails" />}
//                       label="I want to receive updates via email."
//                     />
//                     <Button
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Signing up..." : "Sign up"}
//                     </Button>
//                     <Link
//                       href={LOGIN_ROUTE}
//                       variant="body2"
//                       sx={{ alignSelf: "center" }}
//                     >
//                       Already have an account? Sign in
//                     </Link>
//                   </Box>
//                 </Form>
//               )}
//             </Formik>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <Button
//                 type="button"
//                 fullWidth
//                 variant="outlined"
//                 color="secondary"
//                 onClick={() => alert("Sign up with Google")}
//                 startIcon={<GoogleIcon />}
//               >
//                 Sign up with Google
//               </Button>
//             </Box>
//           </Card>
//         </Stack>
//       </SignUpContainer>
//     </ThemeProvider>
//   );
// }
