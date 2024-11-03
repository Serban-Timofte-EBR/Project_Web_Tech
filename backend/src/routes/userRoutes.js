const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const { auth } = require("../middleware/auth");

// Validation middleware
const registerValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  check("role", "Role must be either 0 (PM) or 1 (TST)").isIn([0, 1]),
  check("teamName")
    .if(check("role").equals("0"))
    .notEmpty()
    .withMessage("Team name is required for Project Manager registration"),
];

const loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

// Routes
router.post("/register", registerValidation, userController.register);
router.post("/login", loginValidation, userController.login);
router.get("/teams", userController.getTeams);

module.exports = router;
