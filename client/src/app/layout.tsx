"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./globals.css";
import theme from "./theme";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: theme.palette.grayscale.offWhite }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
