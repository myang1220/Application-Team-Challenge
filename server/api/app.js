const express = require("express");
const cors = require("cors");
const { participants } = require("./data");
const { diagnosisRoutes } = require("./diagnosis");
const { searchRoutes } = require("./search");

const app = express();

app.use(cors());

app.get("/participants", (_, res) => {
  res.json(participants);
});

app.use("/search", searchRoutes);

app.use("/diagnosis", diagnosisRoutes);

module.exports = { app };
