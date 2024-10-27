const { Bug, User, Team } = require("../models");
const config = require("../config/config");

const bugController = {
  // Create a new bug (TST only)
  async createBug(req, res) {
    try {
      // Check if user is a TST
      if (req.user.role !== config.userRoles.TST) {
        return res.status(403).json({ error: "Only testers can create bugs" });
      }

      const { team_id, severity, description, commit_link } = req.body;

      // Validate team existence and user's access
      const team = await Team.findByPk(team_id);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      const bug = await Bug.create({
        team_id,
        reporter_id: req.user.id,
        severity,
        description,
        commit_link,
        status: config.bugStatus.OPEN,
      });

      res.status(201).json(bug);
    } catch (error) {
      console.error("Error creating bug:", error);
      res.status(500).json({ error: "Error creating bug" });
    }
  },

  // Get bugs for a team
  async getTeamBugs(req, res) {
    try {
      const bugs = await Bug.findAll({
        where: { team_id: req.params.teamId },
        include: [
          {
            model: User,
            as: "reporter",
            attributes: ["id", "email"],
          },
          {
            model: User,
            as: "assignee",
            attributes: ["id", "email"],
          },
        ],
      });
      res.json(bugs);
    } catch (error) {
      console.error("Error getting team bugs:", error);
      res.status(500).json({ error: "Error retrieving bugs" });
    }
  },

  // Assign bug to self (PM only)
  async assignBug(req, res) {
    try {
      // Check if user is a PM
      if (req.user.role !== config.userRoles.PM) {
        return res
          .status(403)
          .json({ error: "Only project managers can assign bugs" });
      }

      const bug = await Bug.findByPk(req.params.bugId);

      if (!bug) {
        return res.status(404).json({ error: "Bug not found" });
      }

      // Check if bug is already assigned
      if (bug.assignee_id) {
        return res.status(400).json({ error: "Bug is already assigned" });
      }

      // Update bug
      bug.assignee_id = req.user.id;
      bug.status = config.bugStatus.IN_PROGRESS;
      await bug.save();

      res.json(bug);
    } catch (error) {
      console.error("Error assigning bug:", error);
      res.status(500).json({ error: "Error assigning bug" });
    }
  },

  // Update bug status and add fix (PM only)
  async updateBugStatus(req, res) {
    try {
      // Check if user is a PM
      if (req.user.role !== config.userRoles.PM) {
        return res
          .status(403)
          .json({ error: "Only project managers can update bug status" });
      }

      const { status, fix_commit_link } = req.body;
      const bug = await Bug.findByPk(req.params.bugId);

      if (!bug) {
        return res.status(404).json({ error: "Bug not found" });
      }

      // Check if the PM is the assignee
      if (bug.assignee_id !== req.user.id) {
        return res
          .status(403)
          .json({ error: "Only the assigned PM can update this bug" });
      }

      // Update bug
      bug.status = status;
      if (fix_commit_link) {
        bug.fix_commit_link = fix_commit_link;
      }
      await bug.save();

      res.json(bug);
    } catch (error) {
      console.error("Error updating bug:", error);
      res.status(500).json({ error: "Error updating bug" });
    }
  },

  // Get single bug details
  async getBug(req, res) {
    try {
      const bug = await Bug.findByPk(req.params.bugId, {
        include: [
          {
            model: User,
            as: "reporter",
            attributes: ["id", "email"],
          },
          {
            model: User,
            as: "assignee",
            attributes: ["id", "email"],
          },
        ],
      });

      if (!bug) {
        return res.status(404).json({ error: "Bug not found" });
      }

      res.json(bug);
    } catch (error) {
      console.error("Error getting bug:", error);
      res.status(500).json({ error: "Error retrieving bug" });
    }
  },
};

module.exports = bugController;
