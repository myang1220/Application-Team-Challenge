/**
 * This file contains the Details component that displays detailed information about a
 * participant, including their personal information and diagnoses. It fetches the
 * participant data from local storage and the diagnosis names from the server.
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Participant } from "../page";

export default function Details() {
  const router = useRouter();
  const theme = useTheme();
  const [participant, setParticipant] = useState<Participant>();
  const [loading, setLoading] = useState(true);
  const [diagnosisNames, setDiagnosisNames] = useState<Map<string, string>>();

  useEffect(() => {
    // fetch participant data from local storage and set it to state
    const participantData = localStorage.getItem("currentParticipant");
    if (participantData) {
      setParticipant(JSON.parse(participantData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // fetch diagnosis names from the server based on ICD codes
    const fetchDiagnosisNames = async () => {
      if (!participant) return;
      const namesMap = new Map<string, string>();

      for (const diagnosis of participant.diagnoses) {
        try {
          const response = await axios.get(
            `http://localhost:5001/diagnosis/${diagnosis.icdCode}`
          );
          namesMap.set(
            diagnosis.icdCode,
            response.data.diagnosis || "Diagnosis not found"
          );
        } catch (error) {
          console.error("Error fetching diagnosis name:", error);
          namesMap.set(diagnosis.icdCode, "Error fetching diagnosis");
        }
      }
      setDiagnosisNames(namesMap);
    };

    fetchDiagnosisNames();
  }, [participant]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <Button
        onClick={() => router.back()}
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{
          display: { xs: "none", md: "flex" },
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.grayscale.white,
          position: "absolute",
          px: 4,
          py: 1.5,
          top: "2%",
          left: "2%",
          zIndex: 10,
        }}
      >
        <Typography variant="h3">Back</Typography>
      </Button>

      {loading ? (
        <CircularProgress />
      ) : participant ? (
        <Container
          sx={{
            mt: "2%",
            mb: "2%",
            width: { xs: "80%", md: "60%" },
            backgroundColor: theme.palette.grayscale.white,
            borderRadius: 3,
            padding: 4,
            boxShadow: `0px 0.4px 0.4rem 0.06rem ${theme.palette.grayscale.black50}`,
            textAlign: "left",
            position: "relative",
          }}
        >
          {/* Personal Information */}
          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.grayscale.labels}`,
              mb: 2,
            }}
          >
            <Typography
              variant="h2"
              sx={{ mb: 2, color: theme.palette.grayscale.body }}
            >
              {participant.firstName} {participant.lastName}
            </Typography>
          </Box>
          <Typography sx={{ mb: 2, color: theme.palette.grayscale.labels }}>
            ICD Codes ({participant.diagnoses.length})
          </Typography>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h3"
              sx={{ mb: 2, fontSize: { xs: "60%", sm: "80%", md: "100%" } }}
            >
              Personal Information
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.grayscale.labels,
                fontSize: { xs: "60%", sm: "80%", md: "100%" },
              }}
            >
              Gender: {participant.gender}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.grayscale.labels,
                fontSize: { xs: "60%", sm: "80%", md: "100%" },
              }}
            >
              Date of Birth:{" "}
              {new Date(participant.dateOfBirth).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.grayscale.labels,
                mb: 2,
                fontSize: { xs: "60%", sm: "80%", md: "100%" },
              }}
            >
              Phone: {participant.phoneNumber}
            </Typography>
            <Typography
              variant="h3"
              sx={{ mb: 2, fontSize: { xs: "60%", sm: "80%", md: "100%" } }}
            >
              Notes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.grayscale.labels,
                fontSize: { xs: "60%", sm: "80%", md: "100%" },
              }}
            >
              {participant.patientNotes || "No notes available"}
            </Typography>
          </Paper>

          {/* Diagnoses */}
          <Box sx={{ p: { xs: 1, sm: 3 } }}>
            {participant.diagnoses.length > 0 ? (
              participant.diagnoses.map((diagnosis, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: theme.palette.grayscale.inputBack,
                    borderRadius: 1,
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.grayscale.black,
                      ml: { sm: 2 },
                      mr: 2,
                      fontSize: { xs: "60%", sm: "80%", md: "100%" },
                    }}
                  >
                    {diagnosisNames?.get(diagnosis.icdCode) ||
                      "Unknown Diagnosis"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.grayscale.body,
                      ml: "auto",
                      fontSize: { xs: "60%", sm: "80%", md: "100%" },
                    }}
                  >
                    {diagnosis.icdCode}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1">No diagnoses recorded</Typography>
            )}
          </Box>
        </Container>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center", mt: 10 }}>
          Participant not found
        </Typography>
      )}
    </Box>
  );
}
