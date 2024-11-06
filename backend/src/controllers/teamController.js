const { Team, User, TeamMember } = require("../models");
const { validationResult } = require("express-validator");

const teamController = {
  // Get all teams
  async getAllTeams(req, res) {
    try {
      const teams = await Team.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "email", "role"],
            through: { attributes: [] }, // Exclude join table data
          },
        ],
      });
      res.json(teams);
    } catch (error) {
      console.error("Error getting teams:", error);
      res.status(500).json({ error: "Error retrieving teams" });
    }
  },

  // Get single team
  async getTeam(req, res) {
    try {
      const team = await Team.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["id", "email", "role"],
            through: { attributes: [] },
          },
        ],
      });

      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      res.json(team);
    } catch (error) {
      console.error("Error getting team:", error);
      res.status(500).json({ error: "Error retrieving team" });
    }
  },

  // Join team
  async joinTeam(req, res) {
    try {
      const { teamId } = req.body;
      const userId = req.user.id;

      // Check if team exists
      const team = await Team.findByPk(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      // Check if user is already in team
      const existingMembership = await TeamMember.findOne({
        where: { user_id: userId, team_id: teamId },
      });

      if (existingMembership) {
        return res.status(400).json({ error: "Already a member of this team" });
      }

      // Add user to team
      await TeamMember.create({
        user_id: userId,
        team_id: teamId,
      });

      res.json({ message: "Successfully joined team" });
    } catch (error) {
      console.error("Error joining team:", error);
      res.status(500).json({ error: "Error joining team" });
    }
  },

  async getAllTeamsWithoutSecrets(req, res) {
    try {
      const teams_without_secrets = await Team.findAll({
        attributes: ["id", "name"]
      });
      res.status(200).json(teams_without_secrets);
    } catch(error) {
      res.status(500).json({ error: "Error retrieving teams" });
    }
  }
};

module.exports = teamController;
