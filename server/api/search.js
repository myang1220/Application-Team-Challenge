/**
 *  @file search.js
 *  @description This file contains the search functionality for participants. It
 *  filters participants based on the search term provided in the URL.
 */

const axios = require("axios");
const express = require("express");
const router = express.Router();
const { participants } = require("./data");

let cache = new Map();

router.get("/:searchTerm", async (req, res) => {
  const { searchTerm } = req.params;

  // check cache first
  if (cache.has(searchTerm)) {
    return res.json(cache.get(searchTerm));
  }

  try {
    // filter participants using search term
    const filteredParticipants = participants.filter((participant) => {
      const fullName =
        `${participant.firstName} ${participant.lastName}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      // search in both name and diagnoses
      const matchesName = fullName.includes(searchLower);
      const matchesDiagnosis = participant.diagnoses.some((diagnosis) =>
        diagnosis.icdCode.toLowerCase().includes(searchLower)
      );

      return matchesName || matchesDiagnosis;
    });

    cache.set(searchTerm, filteredParticipants);

    res.json(filteredParticipants);
  } catch (error) {
    console.error("Error searching participants:", error);
    res.status(500).json({ error: "Failed to search participants" });
  }
});

// clear cache every 10 minutes
setInterval(() => {
  cache.clear();
}, 10 * 60 * 1000);

module.exports = { searchRoutes: router };
