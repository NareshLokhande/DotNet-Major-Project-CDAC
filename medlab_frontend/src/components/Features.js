// import React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";

// import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
// import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
// import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

// import "./../assets/css/feature.css";

// const items = [
//   {
//     icon: <ViewQuiltRoundedIcon />,
//     title: "Dashboard",
//     description:
//       "This item could provide a snapshot of the most important metrics or data points related to the product.",
//     imageLight:
//       'url("/static/images/templates/templates-images/dash-light.png")',
//   },
//   {
//     icon: <EdgesensorHighRoundedIcon />,
//     title: "Mobile integration",
//     description:
//       "This item could provide information about the mobile app version of the product.",
//     imageLight:
//       'url("/static/images/templates/templates-images/mobile-light.png")',
//   },
//   {
//     icon: <DevicesRoundedIcon />,
//     title: "Available on all platforms",
//     description:
//       "This item could let users know the product is available on all platforms, such as web, mobile, and desktop.",
//     imageLight:
//       'url("/static/images/templates/templates-images/devices-light.png")',
//   },
// ];

// export default function Features() {
//   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

//   const handleItemClick = (index) => {
//     setSelectedItemIndex(index);
//   };

//   const selectedFeature = items[selectedItemIndex];

//   return (
//     <Container id="features" className="container">
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={6}>
//           <div>
//             <Typography component="h2" variant="h4" className="title">
//               Product features
//             </Typography>
//             <Typography variant="body1" className="description">
//               Provide a brief overview of the key features of the product. For
//               example, you could list the number of features, their types or
//               benefits, and add-ons.
//             </Typography>
//           </div>
//           <Grid container item className="grid-item">
//             {items.map(({ title }, index) => (
//               <Button
//                 key={index}
//                 onClick={() => handleItemClick(index)}
//                 className={
//                   selectedItemIndex === index ? "stack-card-selected" : ""
//                 }
//               >
//                 {title}
//               </Button>
//             ))}
//           </Grid>
//           <Card variant="outlined" className="card">
//             <Box
//               className="card-image"
//               style={{
//                 backgroundImage: items[selectedItemIndex].imageLight,
//               }}
//             />
//             <Box className="card-content">
//               <Typography gutterBottom className="card-title">
//                 {selectedFeature.title}
//               </Typography>
//               <Typography variant="body2" className="card-description">
//                 {selectedFeature.description}
//               </Typography>
//               <Link className="learn-more-link">
//                 <span>Learn more</span>
//                 <ChevronRightRoundedIcon
//                   fontSize="small"
//                   className="learn-more-icon"
//                 />
//               </Link>
//             </Box>
//           </Card>
//           <Stack direction="column" spacing={2} className="stack">
//             {items.map(({ icon, title, description }, index) => (
//               <Card
//                 key={index}
//                 component={Button}
//                 onClick={() => handleItemClick(index)}
//                 className={`stack-card ${
//                   selectedItemIndex === index ? "stack-card-selected" : ""
//                 }`}
//               >
//                 <Box
//                   className={`stack-card-icon ${
//                     selectedItemIndex === index
//                       ? "stack-card-icon-selected"
//                       : ""
//                   }`}
//                 >
//                   {icon}
//                 </Box>
//                 <div>
//                   <Typography gutterBottom className="stack-card-title">
//                     {title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     className="stack-card-description"
//                   >
//                     {description}
//                   </Typography>
//                   <Link
//                     className="learn-more-link"
//                     onClick={(event) => {
//                       event.stopPropagation();
//                     }}
//                   >
//                     <span>Learn more</span>
//                     <ChevronRightRoundedIcon
//                       fontSize="small"
//                       className="learn-more-icon"
//                     />
//                   </Link>
//                 </div>
//               </Card>
//             ))}
//           </Stack>
//         </Grid>
//         <Grid item xs={12} md={6} className="grid-item">
//           <Card variant="outlined" className="card">
//             <Box
//               className="card-image"
//               style={{
//                 backgroundImage: items[selectedItemIndex].imageLight,
//               }}
//             />
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MuiChip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Dashboard",
    description:
      "This item could provide a snapshot of the most important metrics or data points related to the product.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: "Mobile integration",
    description:
      "This item could provide information about the mobile app version of the product.",
    imageLight:
      'url("/static/images/templates/templates-images/mobile-light.png")',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: "Available on all platforms",
    description:
      "This item could let users know the product is available on all platforms, such as web, mobile, and desktop.",
    imageLight:
      'url("/static/images/templates/templates-images/devices-light.png")',
  },
];

const Chip = styled(MuiChip)(({ theme }) => ({
  background:
    "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
  color: "hsl(0, 0%, 100%)",
  borderColor: theme.palette.primary.light,
  "& .MuiChip-label": {
    color: "hsl(0, 0%, 100%)",
  },
}));

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography
              component="h2"
              variant="h4"
              sx={{ color: "text.primary" }}
            >
              Product features
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
            >
              Provide a brief overview of the key features of the product. For
              example, you could list the number of features, their types or
              benefits, and add-ons.
            </Typography>
          </div>
          <Grid
            container
            item
            sx={{ gap: 1, display: { xs: "auto", sm: "none" } }}
          >
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                selected={selectedItemIndex === index}
              />
            ))}
          </Grid>
          <Card
            variant="outlined"
            sx={{ display: { xs: "auto", sm: "none" }, mt: 4 }}
          >
            <Box
              sx={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 280,
                backgroundImage: "var(--items-imageLight)",
              }}
              style={{
                "--items-imageLight": items[selectedItemIndex].imageLight,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                gutterBottom
                sx={{ color: "text.primary", fontWeight: "medium" }}
              >
                {selectedFeature.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1.5 }}
              >
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  display: "inline-flex",
                  alignItems: "center",
                  "& > svg": { transition: "0.2s" },
                  "&:hover > svg": { transform: "translateX(2px)" },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: "1px", ml: "2px" }}
                />
              </Link>
            </Box>
          </Card>
          <Stack
            direction="column"
            spacing={2}
            useFlexGap
            sx={{
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              display: { xs: "none", sm: "flex" },
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  background: "none",
                  "&:hover": {
                    background:
                      "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)",
                    borderColor: "primary.light",
                    boxShadow: "0px 2px 8px hsla(0, 0%, 0%, 0.1)",
                  },
                  ...(selectedItemIndex === index && {
                    backgroundColor: "action.selected",
                    borderColor: "primary.light",
                  }),
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color:
                        selectedItemIndex === index
                          ? "primary.main"
                          : "grey.400",
                    }}
                  >
                    {icon}
                  </Box>
                  <div>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.primary", fontWeight: "medium" }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 1.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      sx={{
                        fontWeight: "bold",
                        display: "inline-flex",
                        alignItems: "center",
                        "& > svg": { transition: "0.2s" },
                        "&:hover > svg": { transform: "translateX(2px)" },
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: "1px", ml: "2px" }}
                      />
                    </Link>
                  </div>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                m: "auto",
                width: 420,
                height: 500,
                backgroundSize: "contain",
                backgroundImage: "var(--items-imageLight)",
              }}
              style={{
                "--items-imageLight": items[selectedItemIndex].imageLight,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}