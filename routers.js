import express from "express";
import LandingPage from "./src/controllers/landingpage.controller.js";
import AuthController from "./src/controllers/auth.controller.js";
import PostJobController from "./src/controllers/post-job.controller.js";
import JobController from "./src/controllers/find-job.controller.js";
import { jobValidator } from "./src/middleware/jobvalidator.middleware.js";
import ApplyController from "./src/controllers/apply.controller.js";
import { registerValidator } from "./src/middleware/register-validator.middleware.js";
import { loginValidator } from "./src/middleware/login-validator.middleware.js";
import { authMiddleware } from "./src/middleware/auth.middleware.js";
import { fileUploadMiddleware } from "./src/middleware/fileupload.middleware.js";
import { applicationFormValidator } from "./src/middleware/application-validator.middleware.js";

// Declaring router
const router = express.Router();

// Initializing instances
const landingPage = new LandingPage();
const authController = new AuthController();
const postJobController = new PostJobController();
const jobController = new JobController();
const applyController = new ApplyController();

router
  .get("/", landingPage.renderLandingPage)
  .get("/login", authController.renderLoginPage)
  .post("/login", loginValidator, authController.loginUser)
  .get("/register", authController.renderRegisterPage)
  .post("/register", registerValidator, authController.registerUser)
  .get("/logout", authController.logoutUser)
  .get("/post-job", authMiddleware, postJobController.renderPostJobForm)
  .post("/post-job", authMiddleware, jobValidator, postJobController.postNewJob)
  .get("/get-posted-jobs", authMiddleware, postJobController.viewAllPostedJobs)
  .get("/find-job", jobController.renderAllJobs)
  .get("/jobdetails/:id", jobController.getSingleJob)
  .get("/apply/:id", authMiddleware, applyController.renderApplyForm)
  .post(
    "/apply/:id",
    authMiddleware,
    fileUploadMiddleware.single("resume"),
    applicationFormValidator,
    applyController.submitApplication
  )
  .get(
    "/user-applications",
    authMiddleware,
    applyController.getUserApplications
  )
  .get("/delete/:id", authMiddleware, postJobController.deleteAJob)
  .get("/view/:id", authMiddleware, postJobController.viewAllApplicants);

export default router;
