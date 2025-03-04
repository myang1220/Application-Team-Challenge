/**
 * @file theme.ts
 * This file contains the theme configuration for the Material-UI components used in the
 * project. It defines the color palette, typography, and component styles.
 */

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    grayscale: {
      white: string;
      offWhite: string;
      inputBack: string;
      labels: string;
      body: string;
      black: string;
      black50: string;
    };
  }
  interface PaletteOptions {
    grayscale?: {
      white: string;
      offWhite: string;
      inputBack: string;
      labels: string;
      body: string;
      black: string;
      black50: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#4D7EF8",
      dark: "#062D8F",
      light: "rgba(77, 126, 248, 0.5)",
    },
    grayscale: {
      white: "#FFFFFF",
      offWhite: "#E5E5E5",
      inputBack: "#F1F2F3",
      labels: "#97999B",
      body: "#626275",
      black: "#000000",
      black50: "rgba(0, 0, 0, 0.5)",
    },
  },
  typography: {
    fontFamily: '"Mulish", Arial, sans-serif',
    h2: {
      fontSize: "28px",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "20px",
      fontWeight: "normal",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)",
          border: "none",
          "&:hover": {
            border: "2px solid rgba(77, 126, 248, 0.5)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
          backgroundColor: "#ffffff",
          color: "#626275",
        },
      },
    },
  },
});

export default theme;
