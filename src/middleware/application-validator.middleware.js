import { body, validationResult } from "express-validator";

export const applicationFormValidator = async (req, res, next) => {
  const validatingParameters = [
    body("name").isLength({ min: 1 }).withMessage("Name is required"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is not valid")
      .normalizeEmail(),
    body("phone")
      .isLength({ min: 10, max: 15 })
      .withMessage("Contact number must be between 10 and 15 digits.")
      .matches(/^\+?[0-9]*$/)
      .withMessage(
        "Contact number must contain only numbers and an optional leading + sign."
      ),
    body("resume").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Resume is required");
      }
      return true;
    }),
  ];

  // Executing all validations
  await Promise.all(
    validatingParameters.map((parameter) => {
      return parameter.run(req);
    })
  );

  // Sending validation errors
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const jobId = req.params.id;
    return res.render("job-application", {
      errorMessage: validationErrors.array()[0].msg,
      successMessage: null,
      id: jobId
    });
  }

  next();
};
