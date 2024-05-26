import { body, validationResult } from "express-validator";

export const jobValidator = async (req, res, next) => {
  try {
    // Validating all fields
    const validateJobPost = [
      body("jobCategory")
        .notEmpty()
        .withMessage("Job category cannot be empty")
        .isString()
        .withMessage("Job category must be a string"),
      body("jobDesignation")
        .notEmpty()
        .withMessage("Job designation cannot be empty")
        .isString()
        .withMessage("Job designation must be a string"),
      body("jobLocation")
        .notEmpty()
        .withMessage("Job location cannot be empty")
        .isString()
        .withMessage("Job location must be a string"),
      body("companyName")
        .notEmpty()
        .withMessage("Company name cannot be empty")
        .isString()
        .withMessage("Company name must be a string"),
      body("salaryMin")
        .notEmpty()
        .withMessage("Minimum salary cannot be empty")
        .isInt({ min: 0 })
        .withMessage("Minimum salary must be a positive integer")
        .custom((value, { req }) => value <= req.body.salaryMax)
        .withMessage(
          "Minimum salary must be less than or equal to maximum salary"
        ),
      body("salaryMax")
        .notEmpty()
        .withMessage("Maximum salary cannot be empty")
        .isInt({ min: 0 })
        .withMessage("Maximum salary must be a positive integer"),
      body("applyBy")
        .notEmpty()
        .withMessage("Apply by date cannot be empty")
        .isISO8601()
        .withMessage("Apply by date must be a valid date")
        .isAfter(new Date().toISOString())
        .withMessage("Apply by date must be in the future"),
      body("skillsRequired")
        .notEmpty()
        .withMessage("Skills required cannot be empty")
        .isString()
        .withMessage("Skills required must be a string"),
      body("numberOfPostings")
        .notEmpty()
        .withMessage("Number of postings cannot be empty")
        .isInt({ min: 1 })
        .withMessage("Number of postings must be at least 1"),
      body("jobPostedDate")
        .notEmpty()
        .withMessage("Job posted date cannot be empty")
        .isISO8601()
        .withMessage("Job posted date must be a valid date")
        .isBefore(new Date().toISOString())
        .withMessage("Job posted date cannot be in the future"),
    ];

    // Ashynchronously running each validation
    await Promise.all(
      validateJobPost.map((field) => {
        return field.run(req);
      })
    );

    // Sending validation errors
    let validationErrors = validationResult(req);
    // console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
      return res.render("postjob", {
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
