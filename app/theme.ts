"use client";
import { createTheme } from "@mui/material/styles";
import { COLORS } from "@lib/const";

const baseTheme = {
  typography: {
    fontFamily: [
      "-apple-system",
      "system-ui",
      "BlinkMacSystemFont",
      '"Helvetica Neue"',
      "Helvetica",
      "sans-serif",
    ].join(","),
    fontSize: 13,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          position: "relative",
          "&.fit": {
            minHeight: "calc(100vh - 188px)",
          },
        },
      },
    },
    // Button styles
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "44px",
          maxHeight: "64px",
          padding: "12px",
          borderRadius: "12px",
          // textTransform: 'none',
          fontSize: "0.75rem",
          lineHeight: "1rem",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: COLORS.primary[400],
            color: COLORS.primary[100],
            cursor: "not-allowed",
          },
        },
        contained: {
          backgroundColor: COLORS.primary[900],
          color: COLORS.primary[100],
          "&:hover": {
            backgroundColor: COLORS.primary[800],
          },
        },
        outlined: {
          borderColor: COLORS.primary[500],
          color: COLORS.primary[900],
          "&:hover": {
            backgroundColor: COLORS.primary[50],
            borderColor: COLORS.primary[600],
          },
        },
        text: {
          color: COLORS.primary[900],
          "&:hover": {
            backgroundColor: COLORS.primary[50],
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: COLORS.primary[500],
      light: COLORS.primary[400],
      dark: COLORS.primary[600],
      contrastText: COLORS.primary[0],
      ...COLORS.primary,
    },
    text: {
      primary: COLORS.primary[900],
      secondary: COLORS.primary[500],
    },
    background: {
      default: COLORS.primary[0],
      paper: COLORS.primary[0],
    },
    success: {
      main: COLORS.positive[500],
      light: COLORS.positive[600],
      dark: COLORS.positive[900],
    },
    error: {
      main: COLORS.danger[500],
      light: COLORS.danger[600],
      dark: COLORS.danger[900],
    },
    warning: {
      main: COLORS.warning[500],
      light: COLORS.warning[600],
      dark: COLORS.warning[900],
    },
    info: {
      main: COLORS.notification[500],
      light: COLORS.notification[600],
      dark: COLORS.notification[900],
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: COLORS.primary[400],
      light: COLORS.primary[300],
      dark: COLORS.primary[500],
      contrastText: COLORS.primary[900],
      // Reverse the shades for dark mode
      50: COLORS.primary[900],
      100: COLORS.primary[800],
      200: COLORS.primary[700],
      300: COLORS.primary[600],
      400: COLORS.primary[500],
      500: COLORS.primary[400],
      600: COLORS.primary[300],
      700: COLORS.primary[200],
      800: COLORS.primary[100],
      900: COLORS.primary[50],
    },
    text: {
      primary: COLORS.primary[50],
      secondary: COLORS.primary[400],
    },
    background: {
      default: COLORS.primary[900],
      paper: COLORS.primary[900],
    },
    // Accent colors remain the same
    success: {
      main: COLORS.positive[500],
      light: COLORS.positive[600],
      dark: COLORS.positive[900],
    },
    error: {
      main: COLORS.danger[500],
      light: COLORS.danger[600],
      dark: COLORS.danger[900],
    },
    warning: {
      main: COLORS.warning[500],
      light: COLORS.warning[600],
      dark: COLORS.warning[900],
    },
    info: {
      main: COLORS.notification[500],
      light: COLORS.notification[600],
      dark: COLORS.notification[900],
    },
  },
});

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#3b82f6", // Tailwind's primary-500 (blue)
//       light: "#60a5fa", // primary-400
//       dark: "#2563eb", // primary-600
//     },
//     background: {
//       default: "#f9fafb", // Tailwind's primary-50
//       paper: "#ffffff",
//     },
//     text: {
//       primary: "#111827", // near-black
//       secondary: "#374151", // primary-700
//     },
//   },
//   shape: {
//     borderRadius: 16, // smooth modern corners
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//           transition: "box-shadow 0.2s ease-in-out",
//           "&:hover": {
//             boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: 12,
//           padding: "10px 20px",
//           fontWeight: 600,
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 12,
//             "&:hover fieldset": {
//               borderColor: "#3b82f6",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#2563eb",
//               boxShadow: "0 0 0 2px rgba(59,130,246,0.2)",
//             },
//           },
//         },
//       },
//     },
//   },
// });
