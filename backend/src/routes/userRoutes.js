const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { register, login } = require("../controllers/userController");

// Validation middleware
const registerValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  check("role", "Role must be either 0 (PM) or 1 (TST)").isIn([0, 1]),
  check("teamID")
    .if(check("role").equals("1"))
    .notEmpty()
    .withMessage("Team ID is required for Team Member registration"),
];

const loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
