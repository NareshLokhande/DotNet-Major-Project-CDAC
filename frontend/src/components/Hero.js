import * as React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { APPOINTMENTS_ROUTE } from "../constants/AppRoutes";
import { Link } from "react-router-dom";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  outline: "1px solid",
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url(${"/static/images/templates/templates-images/hero-light.png"})`,
  outlineColor: "hsla(220, 25%, 80%, 0.5)",
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Test.&nbsp;Heal&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "inherit",
                color: "primary.main",
              }}
            >
              Thrive.
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Your Health, Our Commitment: Trusted Laboratory Services for
            Accurate Results
          </Typography>

          {/* New heading and button */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "text.primary",
            }}
          >
            Book Your Test
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={APPOINTMENTS_ROUTE}
            sx={{ mt: 2 }}
          >
            Book Now
          </Button>
        </Stack>
        <StyledBox id="image" />
      </Container>
    </Box>
  );
}
