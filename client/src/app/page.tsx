/**
 * This file contains the main page of the application, which displays a list of participants.
 * It includes two filter functions: one for sorting by name and another for sorting by ICD codes.
 */

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export type Participant = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phoneNumber: number;
  patientNotes: string;
  diagnoses: Diagnosis[];
};

export type Diagnosis = {
  icdCode: string;
  timestamp: Date;
};

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const theme = useTheme();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc_name");

  // route to details page when a participant card is clicked
  const handleCardClick = (participant: Participant) => {
    // store the participant data in local storage for details page to have context
    localStorage.setItem("currentParticipant", JSON.stringify(participant));
    router.push("/details");
  };

  // // use test.json as sample data
  // const fetchParticipants = () => {
  //   axios
  //     .get("/assets/test.json")
  //     .then((response) => {
  //       setParticipants(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching participants:", error);
  //       setLoading(false);
  //     });
  // };

  // fetch participants from the server based on search query
  // if search query is empty, fetch all participants
  const fetchParticipants = () => {
    if (searchQuery) {
      axios
        .get(`http://localhost:5001/search/${encodeURIComponent(searchQuery)}`)
        .then((response) => {
          setParticipants(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error searching participants:", error);
          setLoading(false);
        });
    } else {
      axios
        .get("http://localhost:5001/participants")
        .then((response) => {
          setParticipants(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching participants:", error);
          setLoading(false);
        });
    }
  };

  // fetch participants when the component mounts or when the search query changes
  useEffect(() => {
    fetchParticipants();
  }, [searchQuery]);

  // fetch participants every 10 minutes to keep data up to date
  useEffect(() => {
    fetchParticipants();
    const intervalId = setInterval(() => {
      fetchParticipants();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  // sort the participants based on the selected sort order
  const sortedParticipants = [...participants].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

    // sort by both name and number of diagnoses
    // default prioritization is ascending by name and descending by diagnoses
    if (sortOrder === "asc_name") {
      const comparison = nameA.localeCompare(nameB);
      if (comparison !== 0) return comparison;
      return b.diagnoses.length - a.diagnoses.length;
    } else if (sortOrder === "desc_name") {
      const comparison = nameB.localeCompare(nameA);
      if (comparison !== 0) return comparison;
      return b.diagnoses.length - a.diagnoses.length;
    } else if (sortOrder === "asc_code") {
      const comparison = a.diagnoses.length - b.diagnoses.length;
      if (comparison !== 0) return comparison;
      return nameA.localeCompare(nameB);
    } else {
      const comparison = b.diagnoses.length - a.diagnoses.length;
      if (comparison !== 0) return comparison;
      return nameA.localeCompare(nameB);
    }
  });

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          ml: { xs: 0, md: 10 },
          mt: 6,
          color: theme.palette.primary.dark,
          textAlign: { xs: "center", md: "left" },
        }}
        gutterBottom
      >
        Participants
      </Typography>
      <Container
        sx={{
          mt: 3,
          mb: "2%",
          width: "80%",
          backgroundColor: theme.palette.grayscale.white,
          borderRadius: 3,
          padding: 3,
          boxShadow: `0px 0.4px 0.4rem 0.06rem ${theme.palette.grayscale.black50}`,
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.grayscale.offWhite}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                mr: { xs: 0.5, sm: 1 },
                color: theme.palette.grayscale.labels,
                fontSize: { xs: "60%", sm: "100%" },
              }}
            >
              Participant Name
            </Typography>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: { xs: 16, sm: 20 },
                height: { xs: 16, sm: 20 },
                cursor: "pointer",
                transform:
                  sortOrder === "asc_name" ? "rotate(180deg)" : "rotate(0deg)",
                mb: 2,
              }}
              onClick={() =>
                setSortOrder(
                  sortOrder === "asc_name" ? "desc_name" : "asc_name"
                )
              }
            >
              <Image
                src="/assets/orderFilter_Down.svg"
                alt="Filter Down"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Box>

          {/* Labels and Filter Icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: "auto",
              mr: { xs: "5%", sm: "20%" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: theme.palette.grayscale.labels,
                mr: { xs: 0.5, sm: 1 },
                fontSize: { xs: "60%", sm: "100%" },
              }}
            >
              ICD Codes
            </Typography>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: { xs: 16, sm: 20 },
                height: { xs: 16, sm: 20 },
                cursor: "pointer",
                transform:
                  sortOrder === "asc_code" ? "rotate(180deg)" : "rotate(0deg)",
                mb: 2,
              }}
              onClick={() =>
                setSortOrder(
                  sortOrder === "asc_code" ? "desc_code" : "asc_code"
                )
              }
            >
              <Image
                src="/assets/orderFilter_Down.svg"
                alt="Filter Down"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Box>
        </Box>
        {/* Participant Name and Num of ICD Codes */}
        {loading ? (
          <CircularProgress />
        ) : (
          sortedParticipants.map((participant, index) => (
            <Card key={index} sx={{ mb: 2, ml: 2, mr: 2 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(participant)}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.grayscale.body,
                    ml: 2,
                    fontSize: { xs: "60%", sm: "100%" },
                  }}
                >
                  {participant.firstName} {participant.lastName}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.primary.dark,
                    ml: "auto",
                    mr: { xs: "7%", sm: "28%" },
                    fontSize: { xs: "60%", sm: "100%" },
                  }}
                >
                  {participant.diagnoses.length}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
}
