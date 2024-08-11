import { createTheme, alpha } from "@mui/material/styles";

const customTheme = createTheme();

export const brand = {
  50: "hsl(210, 100%, 97%)",
  100: "hsl(210, 100%, 90%)",
  200: "hsl(210, 100%, 80%)",
  300: "hsl(210, 100%, 65%)",
  400: "hsl(210, 98%, 48%)",
  500: "hsl(210, 98%, 42%)",
  600: "hsl(210, 98%, 55%)",
  700: "hsl(210, 100%, 35%)",
  800: "hsl(210, 100%, 16%)",
  900: "hsl(210, 100%, 21%)",
};

export const gray = {
  50: "hsl(220, 60%, 99%)",
  100: "hsl(220, 35%, 94%)",
  200: "hsl(220, 35%, 88%)",
  300: "hsl(220, 25%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 25%, 35%)",
  700: "hsl(220, 25%, 25%)",
  800: "hsl(220, 25%, 10%)",
  900: "hsl(220, 30%, 5%)",
};

export const green = {
  50: "hsl(120, 80%, 98%)",
  100: "hsl(120, 75%, 94%)",
  200: "hsl(120, 75%, 87%)",
  300: "hsl(120, 61%, 77%)",
  400: "hsl(120, 44%, 53%)",
  500: "hsl(120, 59%, 30%)",
  600: "hsl(120, 70%, 25%)",
  700: "hsl(120, 75%, 16%)",
  800: "hsl(120, 84%, 10%)",
  900: "hsl(120, 87%, 6%)",
};

export const orange = {
  50: "hsl(45, 100%, 97%)",
  100: "hsl(45, 92%, 90%)",
  200: "hsl(45, 94%, 80%)",
  300: "hsl(45, 90%, 65%)",
  400: "hsl(45, 90%, 40%)",
  500: "hsl(45, 90%, 35%)",
  600: "hsl(45, 91%, 25%)",
  700: "hsl(45, 94%, 20%)",
  800: "hsl(45, 95%, 16%)",
  900: "hsl(45, 93%, 12%)",
};

export const red = {
  50: "hsl(0, 100%, 97%)",
  100: "hsl(0, 92%, 90%)",
  200: "hsl(0, 94%, 80%)",
  300: "hsl(0, 90%, 65%)",
  400: "hsl(0, 90%, 40%)",
  500: "hsl(0, 90%, 30%)",
  600: "hsl(0, 91%, 25%)",
  700: "hsl(0, 94%, 20%)",
  800: "hsl(0, 95%, 16%)",
  900: "hsl(0, 93%, 12%)",
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
     // dark: brand[800],
      contrastText: brand[50],
    },
    info: {
      light: brand[100],
      main: brand[300],
      //dark: brand[600],
      contrastText: gray[50],
    },
    warning: {
      light: orange[300],
      main: orange[400],
      dark: orange[800],
    },
    error: {
      light: red[300],
      main: red[400],
      //dark: red[800],
    },
    success: {
      light: green[300],
      main: green[400],
      //dark: green[800],
    },
    grey: {
      ...gray,
    },
    divider: alpha(gray[300], 0.5),
    background: {
      default: "hsl(0, 0%, 100%)",
      paper: gray[100],
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
    },
    action: {
      selected: `${alpha(brand[200], 0.2)}`,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    h1: {
      fontSize: customTheme.typography.pxToRem(60),
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: customTheme.typography.pxToRem(48),
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: customTheme.typography.pxToRem(42),
      lineHeight: 1.2,
    },
    h4: {
      fontSize: customTheme.typography.pxToRem(36),
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: customTheme.typography.pxToRem(20),
      fontWeight: 600,
    },
    h6: {
      fontSize: customTheme.typography.pxToRem(18),
    },
    subtitle1: {
      fontSize: customTheme.typography.pxToRem(18),
    },
    subtitle2: {
      fontSize: customTheme.typography.pxToRem(16),
    },
    body1: {
      fontSize: customTheme.typography.pxToRem(15),
      fontWeight: 400,
    },
    body2: {
      fontSize: customTheme.typography.pxToRem(14),
      fontWeight: 400,
    },
    caption: {
      fontSize: customTheme.typography.pxToRem(12),
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default function getHomeTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 8,
            overflow: "clip",
            backgroundColor: "hsl(0, 0%, 100%)",
            border: "1px solid",
            borderColor: gray[100],
            ":before": {
              backgroundColor: "transparent",
            },
            "&:first-of-type": {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            "&:last-of-type": {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
          }),
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: "none",
            borderRadius: 8,
            "&:hover": { backgroundColor: gray[100] },
            "&:focus-visible": { backgroundColor: "transparent" },
          }),
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { mb: 20, border: "none" },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            boxSizing: "border-box",
            transition: "all 100ms ease",
            "&:focus-visible": {
              outline: `3px solid ${alpha(brand[400], 0.5)}`,
              outlineOffset: "2px",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: "none",
            borderRadius: theme.shape.borderRadius,
            textTransform: "none",
            variants: [
              {
                props: {
                  size: "small",
                },
                style: {
                  height: "2rem", // 32px
                  padding: "0 0.5rem",
                },
              },
              {
                props: {
                  size: "medium",
                },
                style: {
                  height: "2.5rem", // 40px
                },
              },
              {
                props: {
                  size: "large",
                },
                style: {
                  height: "3rem", // 48px
                  padding: "0 2rem",
                },
              },
            ],
            "&:hover": {
              boxShadow: "none",
              transform: "scale(1.03)",
            },
            "&:focus-visible": {
              outline: `3px solid ${alpha(brand[400], 0.5)}`,
              outlineOffset: "2px",
            },
          }),
          contained: ({ theme }) => ({
            backgroundColor: brand[500],
            color: brand[50],
            ":hover": {
              backgroundColor: brand[600],
            },
            ":active": {
              backgroundColor: brand[700],
            },
          }),
          outlined: ({ theme }) => ({
            color: brand[500],
            borderColor: brand[500],
            ":hover": {
              backgroundColor: alpha(brand[500], 0.1),
            },
            ":active": {
              backgroundColor: alpha(brand[500], 0.2),
            },
          }),
          text: ({ theme }) => ({
            color: brand[500],
            ":hover": {
              backgroundColor: alpha(brand[500], 0.1),
            },
            ":active": {
              backgroundColor: alpha(brand[500], 0.2),
            },
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            boxShadow: "none",
            height: 40,
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
            "& .MuiChip-deleteIcon": {
              color: gray[600],
              "&:hover": {
                color: gray[800],
              },
            },
          }),
          outlined: ({ theme }) => ({
            borderColor: gray[300],
            color: gray[800],
            "& .MuiChip-deleteIcon": {
              color: gray[800],
              "&:hover": {
                color: gray[600],
              },
            },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[4],
            padding: 24,
          }),
        },
      },
    },
  };
}
