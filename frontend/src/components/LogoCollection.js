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

// import * as React from 'react';
// import {Box, Typography, Grid} from '@mui/material';
// import BiotechIcon from "@mui/icons-material/Biotech";
// import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
// import MasksOutlinedIcon from "@mui/icons-material/MasksOutlined";
// import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
// import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
// import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
// import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

// const logos = [
//   "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
//   "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
//   "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
//   "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
//   "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
//   "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
//   "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_.svg",

// ];

// const logoStyle = {
//   width: '100px',
//   height: '80px',
//   margin: '0 32px',
//   opacity: 0.7,
// };

// export default function LogoCollection() {
//   return (
//     <Box id="logoCollection" sx={{ py: 4 }}>
//       <Typography
//         component="p"
//         variant="subtitle2"
//         align="center"
//         sx={{ color: "text.secondary" }}
//       >
//         Trusted by Healthcare Professionals and Patients
//       </Typography>
//       <Grid container sx={{ justifyContent: "center", mt: 0.5, opacity: 0.6 }}>
//         {logos.map((logo, index) => (
//           <Grid item key={index}>
//             <img
//               src={logo}
//               alt={`Fake company number ${index + 1}`}
//               style={logoStyle}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
