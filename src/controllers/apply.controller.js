import { NotifyEmail } from "../middleware/notifyemail.middleware.js";
import ApplicationModel from "../models/application.model.js";
import JobModel from "../models/job.model.js";

export default class ApplyController {
  constructor() {
    this.applicationMoldel = new ApplicationModel();
    this.jobModel = new JobModel();
    // Binding the constructor
    this.submitApplication = this.submitApplication.bind(this);
    this.getUserApplications = this.getUserApplications.bind(this);
  }

  // Render apply form
  renderApplyForm(req, res) {
    const jobId = req.params.id;
    return res.render("job-application", {
      errorMessage: null,
      successMessage: null,
      id: jobId,
    });
  }

  async submitApplication(req, res) {
    const applicantId = req.userId;
    const jobId = req.params.id;
    const application = req.body;
    const resumePath = req.resumePath;
    const newApplication = { ...application, applicantId, resumePath };

    try {
      // Validate the new job data here if necessary
      this.applicationMoldel.submitApplication(newApplication, jobId);
      const jobDetails = this.jobModel.getJobById(jobId);
      // Sending Confirmation email
      const notificationStatus = await NotifyEmail(
        application.email,
        application.name,
        jobDetails.designation,
        jobDetails.companyName
      );
      if (notificationStatus) {
        return res.render("jobApplicationSuccess");
      }
      return res.render(`/apply/${jobId}`, {
        errorMessage: "Failed to apply the job. Please try again.",
        successMessage: null,
        id: jobId,
      });
    } catch (error) {
      console.error("Error while applying the job:", error);
      return res.render(`/apply/${jobId}`, {
        errorMessage: "Failed to apply the job. Please try again.",
        successMessage: null,
        id: jobId,
      });
    }
  }

  getUserApplications(req, res) {
    const userId = req.userId;
    const applications = this.applicationMoldel.getAllApplications(userId);

    return res.render("user-applications", {
      applications,
    });
  }
}
