/**
 * Header.tsx
 * This component is responsible for rendering the header of the application.
 * It includes the logo and a search bar that allows users to search for participants.
 */

"use client";

import { AppBar, Box, Fade, IconButton, Slide, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Header() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchVisible, setSearchVisible] = useState(false);
  const containerRef = React.useRef<HTMLElement>(null);
  const [searchText, setSearchText] = useState("");

  // handles when the input text changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const performSearch = () => {
    if (searchText) {
      // create a new search parameter
      const params = new URLSearchParams(searchParams);
      params.set("search", searchText);
      router.push(`/?${params.toString()}`);
    } else {
      // remove the search parameter
      const params = new URLSearchParams(searchParams);
      params.delete("search");
      router.push(`/?${params.toString()}`);
    }
  };

  // when enter pressed, search for the text in the search bar
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  // search for text when input field is not empty and search icon clicked
  const handleSearchClick = () => {
    if (searchVisible && searchText) {
      performSearch();
    } else {
      performSearch(); // remove paramter if search empty
      setSearchVisible(!searchVisible);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: theme.palette.grayscale.white }}
      >
        <Box sx={{ display: "flex", alignItems: "center", padding: "2px" }}>
          {/* Logo */}
          <Box
            component="span"
            sx={{
              display: {
                xs: searchVisible ? "none" : "inline-block",
                sm: "inline-block",
              },
              width: { xs: 210, sm: 240, md: 300 },
              height: { xs: 70, sm: 80, md: 100 },
              cursor: "pointer",
              marginX: { xs: 1, sm: 2 },
              position: "relative",
            }}
            onClick={() => (window.location.href = "/")}
          >
            <Image
              src="/assets/logo_IntusCare.svg"
              alt="Logo"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "left center", // Align to the left
              }}
              priority // Load image with priority
            />
          </Box>
          <Box sx={{ ml: "auto", mr: 4 }} ref={containerRef}>
            {/* Search Box */}
            {searchVisible && (
              <Slide
                in={searchVisible}
                container={containerRef.current}
                direction="left"
              >
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  size="small"
                  sx={{
                    mr: { sm: 2 },
                    my: { xs: 2 },
                    "& .MuiInputBase-input": {
                      padding: "8px 14px",
                      fontSize: "0.875rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: { xs: "30px", sm: "40px" },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.875rem",
                      transform: {
                        xs: "translate(14px, 6px) scale(1)",
                        sm: "translate(14px, 12px) scale(1)",
                      },
                    },
                    "& .MuiInputLabel-shrink": {
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                  }}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyPress}
                  autoFocus
                />
              </Slide>
            )}
            {/* Search Icon */}
            <IconButton
              sx={{
                color: theme.palette.primary.main,
              }}
              onClick={() => handleSearchClick()}
            >
              <SearchIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
    </>
  );
}
