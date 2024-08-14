import * as React from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
  InputBase,
  Avatar,
  Tooltip,
  Menu,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";

import { alpha, createTheme, ThemeProvider} from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";

import MedLabIcon from "./MedLabIcon";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../constants/AppRoutes";
import getHomeTheme from "../pages/getHomeTheme";

  const mode = "light";
  const HomeTheme = createTheme(getHomeTheme(mode));
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    if (query.trim() !== "") {
      setIsSearching(true);
      fetchSearchResults(query);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`/api/search-tests?q=${query}`);
      setSearchResults(response.data);
      setIsSearching(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsSearching(false);
    }
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={HomeTheme}>
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
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
                  onClick={() => scrollToSection("pricing")}
                >
                  Pricing
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
                position: "relative",
              }}
            >
              {searchOpen ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: alpha("#fff", 0.8),
                    borderRadius: "4px",
                    p: "4px 8px",
                    width: "300px",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search tests"
                    inputProps={{ "aria-label": "search tests" }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    autoFocus
                  />
                  <IconButton sx={{ p: "10px" }} onClick={toggleSearch}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
              ) : (
                <IconButton aria-label="search" onClick={toggleSearch}>
                  <SearchIcon />
                </IconButton>
              )}

              {isSearching && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    bgcolor: "background.paper",
                    borderRadius: "4px",
                    boxShadow: 3,
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                  }}
                >
                  <Box>Loading...</Box>
                </Box>
              )}

              {searchResults.length > 0 && !isSearching && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    bgcolor: "background.paper",
                    borderRadius: "4px",
                    boxShadow: 3,
                    zIndex: 1000,
                  }}
                >
                  {searchResults.map((result, index) => (
                    <MenuItem key={index} sx={{ color: "black" }}>
                      {result}
                    </MenuItem>
                  ))}
                </Box>
              )}

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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

                  <MenuItem onClick={() => scrollToSection("login")}>
                    Login
                  </MenuItem>
                  <MenuItem component={Link} to={REGISTER_ROUTE}>
                    Register
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}


// import * as React from "react";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Button,
//   IconButton,
//   Container,
//   Divider,
//   MenuItem,
//   Drawer,
//   InputBase
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import SearchIcon from "@mui/icons-material/Search";

// import { alpha } from "@mui/material/styles";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import MedLabIcon from "./MedLabIcon";
// import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../constants/AppRoutes";

// function Navbar() {
//   const [open, setOpen] = React.useState(false);
//   const [searchOpen, setSearchOpen] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [searchResults, setSearchResults] = React.useState([]);
//   const [isSearching, setIsSearching] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const toggleSearch = () => {
//     setSearchOpen(!searchOpen);
//     setSearchTerm("");
//     setSearchResults([]);
//   };

//   const handleSearchChange = (event) => {
//     const query = event.target.value;
//     setSearchTerm(query);
//     if (query.trim() !== "") {
//       setIsSearching(true);
//       fetchSearchResults(query);
//     } else {
//       setIsSearching(false);
//       setSearchResults([]);
//     }
//   };

//   const fetchSearchResults = async (query) => {
//     try {
//       const response = await axios.get(`/api/search-tests?q=${query}`);
//       setSearchResults(response.data);
//       setIsSearching(false);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setIsSearching(false);
//     }
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
//           sx={{
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
//           }}
//         >
//           <Box
//             sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
//           >
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
//             <Box sx={{ display: { xs: "none", md: "flex" } }}>
//               {/* <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("features")}
//               >
//                 Features
//               </Button> */}

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

//               {/* <Button
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
//               </Button> */}
//               <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("pricing")}
//               >
//                 Pricing
//               </Button>

//               {/* <Button
//                 variant="text"
//                 color="info"
//                 size="small"
//                 onClick={() => scrollToSection("faq")}
//                 sx={{ minWidth: 0 }}
//               >
//                 FAQ
//               </Button> */}
//             </Box>
//           </Box>
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: 0.5,
//               alignItems: "center",
//               position: "relative",
//             }}
//           >
//             {searchOpen ? (
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   bgcolor: alpha("#fff", 0.8),
//                   borderRadius: "4px",
//                   p: "4px 8px",
//                   width: "300px",
//                 }}
//               >
//                 <InputBase
//                   sx={{ ml: 1, flex: 1 }}
//                   placeholder="Search tests"
//                   inputProps={{ "aria-label": "search tests" }}
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   autoFocus
//                 />
//                 <IconButton sx={{ p: "10px" }} onClick={toggleSearch}>
//                   <CloseRoundedIcon />
//                 </IconButton>
//               </Box>
//             ) : (
//               <IconButton aria-label="search" onClick={toggleSearch}>
//                 <SearchIcon />
//               </IconButton>
//             )}

//             {isSearching && (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "100%",
//                   left: 0,
//                   right: 0,
//                   bgcolor: "background.paper",
//                   borderRadius: "4px",
//                   boxShadow: 3,
//                   zIndex: 1000,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   p: 1,
//                 }}
//               >
//                 <Box>Loading...</Box>
//               </Box>
//             )}

//             {searchResults.length > 0 && !isSearching && (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "100%",
//                   left: 0,
//                   right: 0,
//                   bgcolor: "background.paper",
//                   borderRadius: "4px",
//                   boxShadow: 3,
//                   zIndex: 1000,
//                 }}
//               >
//                 {searchResults.map((result, index) => (
//                   <MenuItem key={index} sx={{ color: "black" }}>
//                     {result}
//                   </MenuItem>
//                 ))}
//               </Box>
//             )}

//             <Button
//               color="primary"
//               variant="text"
//               size="small"
//               component={Link}
//               to={LOGIN_ROUTE}
//             >
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
//                   <IconButton onClick={toggleDrawer(false)}>
//                     <CloseRoundedIcon />
//                   </IconButton>
//                 </Box>

//                 <Divider sx={{ my: 3 }} />
//                 <MenuItem onClick={() => scrollToSection("features")}>
//                   Features
//                 </MenuItem>

//                 <MenuItem onClick={() => scrollToSection("tests")}>
//                   Tests
//                 </MenuItem>

//                 <MenuItem onClick={() => scrollToSection("homeVisits")}>
//                   Home Visits
//                 </MenuItem>

//                 <MenuItem onClick={() => scrollToSection("Rx_Upload")}>
//                   Know your Test
//                 </MenuItem>

//                 <MenuItem onClick={() => scrollToSection("testimonials")}>
//                   Testimonials
//                 </MenuItem>

//                 {/* <MenuItem onClick={() => scrollToSection("highlights")}>
//                   Highlights
//                 </MenuItem> */}

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

// export default Navbar;

// import * as React from "react";
// import axios from "axios";

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
// import SearchIcon from "@mui/icons-material/Search"; // Import Search icon
// import InputBase from "@mui/material/InputBase"; // Import InputBase for search field
// import { alpha } from "@mui/material/styles"; // Import alpha for styling
// import { Link } from "react-router-dom";

// import MedLab from "./MedLabIcon";
// import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants/AppRoutes";

// function Navbar() {
//   const [open, setOpen] = React.useState(false);
//   const [searchOpen, setSearchOpen] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [searchResults, setSearchResults] = React.useState([]);
//   const [isSearching, setIsSearching] = React.useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const toggleSearch = () => {
//     setSearchOpen(!searchOpen);
//     setSearchTerm("");
//     setSearchResults([]);
//   };

//   const handleSearchChange = (event) => {
//     const query = event.target.value;
//     setSearchTerm(query);
//     if (query.trim() !== "") {
//       setIsSearching(true);
//       fetchSearchResults(query);
//     } else {
//       setIsSearching(false);
//       setSearchResults([]);
//     }
//   };

//   // Calling from api
//   const fetchSearchResults = async (query) => {
//     try {
//       const response = await axios.get(`/api/search-tests?q=${query}`);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   //scrolling effect of sections
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
//           sx={{
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
//           }}
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
//               //display: "flex",
//               position: "relative",
//             }}
//           >
//             {searchOpen ? (
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   bgcolor: alpha("#fff", 0.8),
//                   borderRadius: "4px",
//                   p: "4px 8px",
//                   width: "300px",
//                 }}
//               >
//                 <InputBase
//                   sx={{ ml: 1, flex: 1 }}
//                   placeholder="Search tests"
//                   inputProps={{ "aria-label": "search tests" }}
//                   value={searchTerm}
//                   onChange={handleSearchchange}
//                   autoFocus
//                 />
//                 <IconButton sx={{ p: "10px" }} onClick={toggleSearch}>
//                   <CloseRoundedIcon />
//                 </IconButton>
//               </Box>
//             ) : (
//               <IconButton aria-label="search" onClick={toggleSearch}>
//                 <SearchIcon />
//               </IconButton>
//             )}

//             {searchResults.length > 0 && (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "100%",
//                   left: 0,
//                   right: 0,
//                   bgcolor: "background.paper",
//                   borderRadius: "4px",
//                   boxShadow: 3,
//                   zIndex: 1000,
//                 }}
//               >
//                 {searchResults.map((result, index) => (
//                   <MenuItem key={index} sx={{ color: "black" }}>
//                     {result}
//                   </MenuItem>
//                 ))}
//               </Box>
//             )}

//             <Button
//               color="primary"
//               variant="text"
//               size="small"
//               component={Link}
//               to={LOGIN_ROUTE}
//             >
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
//                   <IconButton onClick={toggleDrawer(false)}>
//                     <CloseRoundedIcon />
//                   </IconButton>
//                 </Box>

//                 <Divider sx={{ my: 3 }} />
//                 <MenuItem onClick={() => scrollToSection("features")}>
//                   Features
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("tests")}>
//                   Tests
//                 </MenuItem>
//                 <MenuItem onClick={() => scrollToSection("homeVisits")}>
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

// export default Navbar;
