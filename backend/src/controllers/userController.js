const User = require("../models/user");
const { Team, TeamMember } = require("../models");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { sequelize } = require("../config/database");

const userController = {
  // Register
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, role, teamID } = req.body;

      console.log("Registering user:", email, role, teamID);

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Start a transaction
      const result = await sequelize.transaction(async (t) => {
        // Create user
        const user = await User.create(
          {
            email,
            password,
            role,
          },
          { transaction: t }
        );

        // If PM role, find team and add user to it
        if (role === 1) {
          if (!teamID) {
            throw new Error("Team ID is required for Team Member registration");
          }

          const team = await Team.findByPk(teamID, { transaction: t });
          if (!team) {
            throw new Error("Team not found");
          }

          await TeamMember.create(
            {
              user_id: user.id,
              team_id: teamID,
            },
            { transaction: t }
          );

          return { user, team };
        }

        return { user };
      });

      // Generate JWT token
      const token = jwt.sign({ id: result.user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.status(201).json({
        user: {
          id: result.user.id,
          email: result.user.email,
          role: result.user.role,
        },
        team: result.team
          ? {
              id: result.team.id,
              name: result.team.name,
            }
          : undefined,
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.message === "Team not found") {
        return res.status(404).json({ error: "Team not found" });
      }
      res.status(500).json({ error: "Error during registration" });
    }
  },

  // Login
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Validate password
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Error during login" });
    }
  },

  // Get Teams
  async getTeams(req, res) {
    try {
      const teams = await Team.findAll({
        attributes: ["id", "name", "description"],
        order: [["name", "ASC"]],
      });
      res.json(teams);
    } catch (error) {
      console.error("Error getting teams:", error);
      res.status(500).json({ error: "Error retrieving teams" });
    }
  },
};

module.exports = userController;
