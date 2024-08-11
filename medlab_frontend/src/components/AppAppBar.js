import * as React from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

import MedLab from "./MedLabIcon";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants/AppRoutes";

function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "999px",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "hsla(220, 60%, 99%, 0.6)",
            boxShadow:
              "0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)",
          }}
        >
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <MedLab />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection("features")}
              >
                Features
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection("tests")}
              >
                Tests
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection("homeVisits")}
              >
                Home Visits
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection("Rx_Upload")}
              >
                Know your Test
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection("testimonials")}
              >
                Testimonials
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection("highlights")}
              >
                Highlights
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection("pricing")}
              >
                Pricing
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection("faq")}
                sx={{ minWidth: 0 }}
              >
                FAQ
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              variant="text"
              size="small"
              component={Link}
              to={LOGIN_ROUTE}
            >
              Sign in
            </Button>

            <Button
              color="primary"
              variant="contained"
              size="small"
              component={Link}
              to={REGISTER_ROUTE}
            >
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 3 }} />
                <MenuItem onClick={() => scrollToSection("features")}>
                  Features
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("tests")}>
                  Tests
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("homeVisits")}>
                  Home Visits
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("Rx_Upload")}>
                  Know your Test
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("testimonials")}>
                  Testimonials
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("highlights")}>
                  Highlights
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("pricing")}>
                  Pricing
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("faq")}>FAQ</MenuItem>

                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppAppBar;


// import * as React from "react";
// import PropTypes from "prop-types";

// import Box from "@mui/material/Box";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import Container from "@mui/material/Container";
// import Divider from "@mui/material/Divider";
// import MenuItem from "@mui/material/MenuItem";
// import Drawer from "@mui/material/Drawer";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import ToggleColorMode from "./ToggleColorMode";

// import MedLab from "./MedLabIcon";
// import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants/AppRoutes";
// import { Link } from "react-router-dom";

// function AppAppBar({ mode, toggleColorMode }) {
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const scrollToSection = (sectionId) => {
//     const sectionElement = document.getElementById(sectionId);
//     const offset = 128;
//     if (sectionElement) {
//       const targetScroll = sectionElement.offsetTop - offset;
//       sectionElement.scrollIntoView({ behavior: "smooth" });
//       window.scrollTo({
//         top: targetScroll,
//         behavior: "smooth",
//       });
//       setOpen(false);
//     }
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         boxShadow: 0,
//         bgcolor: "transparent",
//         backgroundImage: "none",
//         mt: 2,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Toolbar
//           variant="regular"
//           sx={(theme) => ({
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexShrink: 0,
//             borderRadius: "999px",
//             backdropFilter: "blur(24px)",
//             maxHeight: 40,
//             border: "1px solid",
//             borderColor: "divider",
//             bgcolor: "hsla(220, 60%, 99%, 0.6)",
//             boxShadow:
//               "0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)",
//             ...theme.applyStyles("dark", {
//               bgcolor: "hsla(220, 0%, 0%, 0.7)",
//               boxShadow:
//                 "0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)",
//             }),
//           })}
//         >
//           <Box
//             sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
//           >
//             <MedLab />
//             <Box sx={{ display: { xs: "none", md: "flex" } }}>
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("features")}
//               >
//                 Features
//               </Button>
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("tests")}
//               >
//                 Tests
//               </Button>
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("homeVisits")}
//               >
//                 Home Visits
//               </Button>
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("Rx_Upload")}
//               >
//                 Know your Test
//               </Button>
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("testimonials")}
//               >
//                 Testimonials
//               </Button>
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("highlights")}
//               >
//                 Highlights
//               </Button>
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("pricing")}
//               >
//                 Pricing
//               </Button>
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("faq")}
//                 sx={{ minWidth: 0 }}
//               >
//                 FAQ
//               </Button>
//             </Box>
//           </Box>
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: 0.5,
//               alignItems: "center",
//             }}
//           >
//             <ToggleColorMode
//               data-screenshot="toggle-mode"
//               mode={mode}
//               toggleColorMode={toggleColorMode}
//             />
//             <Button color="primary" variant="text" size="small" component={Link} to={LOGIN_ROUTE}>
//               Sign in
//             </Button>

//             <Button
//               color="primary"
//               variant="contained"
//               size="small"
//               component={Link}
//               to={REGISTER_ROUTE}
//             >
//               Sign up
//             </Button>
//           </Box>
//           <Box sx={{ display: { sm: "flex", md: "none" } }}>
//             <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
//               <MenuIcon />
//             </IconButton>

//             <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
//               <Box sx={{ p: 2, backgroundColor: "background.default" }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <ToggleColorMode
//                     mode={mode}
//                     toggleColorMode={toggleColorMode}
//                   />
//                   <IconButton onClick={toggleDrawer(false)}>
//                     <CloseRoundedIcon />
//                   </IconButton>
//                 </Box>

//                 <Divider sx={{ my: 3 }} />
//                 <MenuItem onClick={() => scrollToSection("features")}>
//                   Features
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("test")}>
//                   Tests
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("homevisits")}>
//                   Home Visits
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("Rx_Upload")}>
//                   Know your Test
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("testimonials")}>
//                   Testimonials
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("highlights")}>
//                   Highlights
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("pricing")}>
//                   Pricing
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("faq")}>FAQ</MenuItem>

//                 <MenuItem>
//                   <Button color="primary" variant="contained" fullWidth>
//                     Sign up
//                   </Button>
//                 </MenuItem>
//                 <MenuItem>
//                   <Button color="primary" variant="outlined" fullWidth>
//                     Sign in
//                   </Button>
//                 </MenuItem>
//               </Box>
//             </Drawer>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// AppAppBar.propTypes = {
//   mode: PropTypes.oneOf(["dark", "light"]).isRequired,
//   toggleColorMode: PropTypes.func.isRequired,
// };

// export default AppAppBar;
