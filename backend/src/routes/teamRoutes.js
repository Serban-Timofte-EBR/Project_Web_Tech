const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const { auth } = require("../middleware/auth");

// Get all teams
router.get("/", auth, teamController.getAllTeams);

// Get all teams with only id and anme
router.get("/no-secrets", teamController.getAllTeamsWithoutSecrets);

// Get single team
router.get("/:id", auth, teamController.getTeam);

// Join team
router.post("/join", auth, teamController.joinTeam);

module.exports = router;
