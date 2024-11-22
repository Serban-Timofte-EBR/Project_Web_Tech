/**
 * Express middleware that processes validation results from express-validator.
 * Used after validation rules in routes to check if the request is valid.
 *
 * How it works:
 * 1. Gets validation results from previous middleware (express-validator checks)
 * 2. If validation errors exist, returns 400 status with formatted error messages
 * 3. If validation passes, allows request to continue to next middleware/controller
 *
 * Example usage in routes:
 * router.post("/", [
 *   check("email").isEmail(),  // Validation rule
 *   validate,                  // This middleware
 *   controller.method          // Only executes if validation passes
 * ]);
 */
const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = validate;
