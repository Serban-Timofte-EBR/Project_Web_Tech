// routes/bugRoutes.js
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const bugController = require("../controllers/bugController");
const { auth, checkRole } = require("../middleware/auth");
const validate = require("../middleware/validate");
const config = require("../config/config");
const { userRoles } = config;

// Validation rules
const createBugValidation = [
  check("team_id").isInt().withMessage("Team ID must be an integer"),
  check("severity")
    .isIn(Object.values(config.bugSeverity))
    .withMessage("Invalid severity level"),
  check("description")
    .isString()
    .trim()
    .isLength({ min: 1, max: config.validation.description.maxLength })
    .withMessage(
      `Description must be between 1 and ${config.validation.description.maxLength} characters`
    ),
  check("commit_link").isURL().withMessage("Valid commit URL is required"),
];

const updateBugValidation = [
  check("status")
    .isIn(Object.values(config.bugStatus))
    .withMessage("Invalid bug status"),
  check("fix_commit_link")
    .optional()
    .isURL()
    .withMessage("Fix commit link must be a valid URL"),
];

// Routes

// POST /api/bugs - Create a new bug (TST only)
router.post(
  "/",
  auth,
  checkRole([userRoles.TST]),
  createBugValidation,
  validate,
  bugController.createBug
);

// GET /api/bugs/team/:teamId - Get all bugs for a team
router.get(
  "/team/:teamId",
  auth,
  // Both PM and TST can view bugs
  checkRole([userRoles.PM, userRoles.TST]),
  [check("teamId").isInt().withMessage("Team ID must be an integer")],
  validate,
  bugController.getTeamBugs
);

// GET /api/bugs/:bugId - Get single bug details
router.get(
  "/:bugId",
  auth,
  // Both PM and TST can view bugs
  checkRole([userRoles.PM, userRoles.TST]),
  [check("bugId").isInt().withMessage("Bug ID must be an integer")],
  validate,
  bugController.getBug
);

// PATCH /api/bugs/:bugId/assign - Assign bug to self (PM only)
router.patch(
  "/:bugId/assign",
  auth,
  checkRole([userRoles.PM]),
  [check("bugId").isInt().withMessage("Bug ID must be an integer")],
  validate,
  bugController.assignBug
);

// PATCH /api/bugs/:bugId/status - Update bug status and fix (PM only)
router.patch(
  "/:bugId/status",
  auth,
  checkRole([userRoles.PM]),
  [
    check("bugId").isInt().withMessage("Bug ID must be an integer"),
    ...updateBugValidation,
  ],
  validate,
  bugController.updateBugStatus
);

module.exports = router;
