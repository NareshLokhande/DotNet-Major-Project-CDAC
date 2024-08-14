import * as React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


import MuiChip from "@mui/material/Chip";

import { styled } from "@mui/material/styles";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import onlineAppointmentBooking from "./../assets/images/Online_Appointment_Booking.jpg";
import Sample from "./../assets/images/Sample.jpg";
import Reports from "./../assets/images/Reports.jpg";
import { APPOINTMENTS_ROUTE, SAMPLE_TRACKING_ROUTE, USER_REPORTS_ROUTE } from "../constants/AppRoutes";

const items = [
  {
    icon: <CalendarTodayRoundedIcon />,
    title: "Online Appointment Booking",
    description:
      "Easily schedule lab appointments online with a user-friendly interface, ensuring convenience and flexibility.",
    imageLight: `url(${onlineAppointmentBooking})`,
    link: `${APPOINTMENTS_ROUTE}`,
  },
  {
    icon: <LocalShippingRoundedIcon />,
    title: "Sample Tracking",
    description:
      "Track your lab samples in real-time, from collection to testing, ensuring transparency and reliability.",
    imageLight: `url(${Sample})`,
    link: `${SAMPLE_TRACKING_ROUTE}`,
  },
  {
    icon: <DescriptionRoundedIcon />,
    title: "Report Viewing",
    description:
      "Access and download your lab reports online, with secure and easy-to-use tools that keep your data safe.",
    imageLight: `url(${Reports})`,
    link: `${USER_REPORTS_ROUTE}`,
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
              System Features
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
            >
              Explore the key features of our MedLab system that enhance user
              experience and provide seamless access to lab services.
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
              component={RouterLink}
                to={selectedFeature.link}
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
