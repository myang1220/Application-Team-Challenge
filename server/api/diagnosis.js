/**
 * @file diagnosis.js
 * @description This file contains the diagnosis functionality for participants.
 * It fetches the diagnosis name based on the ICD code provided in the URL.
 */

const axios = require("axios");
const express = require("express");
const router = express.Router();

let cache = new Map();

router.get("/:icdCode", async (req, res) => {
  const { icdCode } = req.params;

  // check cache first
  if (cache.has(icdCode)) {
    return res.json({ diagnosis: cache.get(icdCode) });
  }

  try {
    // use clininal tables API to get diagnosis name
    const response = await axios.get(
      `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?terms=${icdCode}`
    );
    // parse through json data to get the diagnosis name
    const diagnosisName = response.data[3][0][1] || "Diagnosis name not found";
    cache.set(icdCode, diagnosisName);
    return res.json({ diagnosis: diagnosisName });
  } catch {
    return res.json({ diagnosis: "Diagnosis not found" });
  }
});

// clear cache every 10 minutes
setInterval(() => {
  cache.clear();
}, 10 * 60 * 1000);

module.exports = { diagnosisRoutes: router };
