import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import ForgotPassword from "./ForgotPassword";
import MedLabIcon, { GoogleIcon } from "../../components/MedLabIcon";
import { REGISTER_ROUTE } from "../../constants/AppRoutes";

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
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate inputs
    if (!validateInputs()) return;

    // Send login request
    try {
      const response = await fetch("https://localhost:7150/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorDetails}`
        );
      }

      const data = await response.json();

      // Handle successful login
      console.log("Login successful:", data);
      // Redirect to another page or update the UI as needed
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <MedLabIcon />
      </Box>
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
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
            sx={{ ariaLabel: "email" }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {loginError && <Typography color="error">{loginError}</Typography>}
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
        <Link
          variant="body2"
          sx={{ alignSelf: "center" }}
          to={REGISTER_ROUTE}
          component={RouterLink}
        >
          Don&apos;t have an account? Sign up
        </Link>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
      </Box>
    </Card>
  );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import MuiCard from '@mui/material/Card';
// import Checkbox from '@mui/material/Checkbox';
// import Divider from '@mui/material/Divider';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Link from '@mui/material/Link';
// import { Link as RouterLink } from "react-router-dom";
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// import { styled } from '@mui/material/styles';

// import ForgotPassword from './ForgotPassword';
// import MedLabIcon, { GoogleIcon } from '../../components/MedLabIcon';
// import { REGISTER_ROUTE } from '../../constants/AppRoutes';

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   gap: theme.spacing(4),
//   width: '100%',
//   padding: theme.spacing(2),
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(4),
//     width: '450px',
//   },
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
//   }),
// }));

// export default function SignInCard() {
//   const [emailError, setEmailError] = React.useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
//   const [passwordError, setPasswordError] = React.useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   const validateInputs = () => {
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');

//     let isValid = true;

//     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
//       setEmailError(true);
//       setEmailErrorMessage('Please enter a valid email address.');
//       isValid = false;
//     } else {
//       setEmailError(false);
//       setEmailErrorMessage('');
//     }

//     if (!password.value || password.value.length < 6) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Password must be at least 6 characters long.');
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordErrorMessage('');
//     }

//     return isValid;
//   };

//   return (
//     <Card>
//       <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//         <MedLabIcon />
//       </Box>
//       <Typography
//         component="h1"
//         variant="h4"
//         sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
//       >
//         Sign in
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         noValidate
//         sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
//       >
//         <FormControl>
//           <FormLabel htmlFor="email">Email</FormLabel>
//           <TextField
//             error={emailError}
//             helperText={emailErrorMessage}
//             id="email"
//             type="email"
//             name="email"
//             placeholder="your@email.com"
//             autoComplete="email"
//             autoFocus
//             required
//             fullWidth
//             variant="outlined"
//             color={emailError ? 'error' : 'primary'}
//             sx={{ ariaLabel: 'email' }}
//           />
//         </FormControl>
//         <FormControl>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <FormLabel htmlFor="password">Password</FormLabel>
//             <Link
//               component="button"
//               onClick={handleClickOpen}
//               variant="body2"
//               sx={{ alignSelf: 'baseline' }}
//             >
//               Forgot your password?
//             </Link>
//           </Box>
//           <TextField
//             error={passwordError}
//             helperText={passwordErrorMessage}
//             name="password"
//             placeholder="••••••"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             autoFocus
//             required
//             fullWidth
//             variant="outlined"
//             color={passwordError ? 'error' : 'primary'}
//           />
//         </FormControl>
//         <FormControlLabel
//           control={<Checkbox value="remember" color="primary" />}
//           label="Remember me"
//         />
//         <ForgotPassword open={open} handleClose={handleClose} />

//         <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
//           Sign in
//         </Button>

//         <Link variant="body2" sx={{ alignSelf: 'center' }} to={REGISTER_ROUTE} component={RouterLink}>
//           Don&apos;t have an account? Sign up
//         </Link>
//       </Box>
//       <Divider>or</Divider>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <Button
//           type="submit"
//           fullWidth
//           variant="outlined"
//           color="secondary"
//           onClick={() => alert('Sign in with Google')}
//           startIcon={<GoogleIcon />}
//         >
//           Sign in with Google
//         </Button>
//       </Box>
//     </Card>
//   );
// }
