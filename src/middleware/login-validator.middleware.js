import { body, validationResult } from "express-validator";

export const loginValidator = async (req, res, next) => {
  try {
    // Validating all fields
    const validateUser = [
      // Email validation: must be a valid email format
      body("email")
        .trim()
        .isEmail()
        .withMessage("Email is not valid")
        .normalizeEmail(),

      // Password validation: must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    ];

    // Ashynchronously running each validation
    await Promise.all(
      validateUser.map((field) => {
        return field.run(req);
      })
    );

    // Sending validation errors
    let validationErrors = validationResult(req);
    // console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
      return res.render("login", {
        errorMessage: validationErrors.array()[0].msg,
        successMessage: null,
      });
    }

    // If all fields are correct
    next();
  } catch (error) {
    console.log(error);
  }
};
