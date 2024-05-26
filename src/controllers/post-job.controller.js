import ApplicationModel from "../models/application.model.js";
import JobModel from "../models/job.model.js";

export default class PostJobController {
  // Creating an instance of job model
  constructor() {
    this.jobModel = new JobModel();
    this.applicationModel = new ApplicationModel();
    this.postNewJob = this.postNewJob.bind(this);
    this.viewAllPostedJobs = this.viewAllPostedJobs.bind(this);
    this.deleteAJob = this.deleteAJob.bind(this);
    this.viewAllApplicants = this.viewAllApplicants.bind(this);
    this.viewAllApplicants = this.viewAllApplicants.bind(this);
  }

  // Rendering the form to post a new job by recruiter
  renderPostJobForm(req, res) {
    return res.render("postjob", { errorMessage: null, successMessage: null });
  }

  // Posting a new Job
  postNewJob(req, res) {
    const newJob = req.body;
    const recruiterId = req.userId;
    try {
      // Validate the new job data here if necessary
      this.jobModel.createAJob({ recruiterId, ...newJob });
      return res.render("jobPostSuccess");
    } catch (error) {
      console.error("Error posting new job:", error);
      return res.render("postjob", {
        errorMessage: "Failed to post the job. Please try again.",
        successMessage: null,
      });
    }
  }

  viewAllPostedJobs(req, res) {
    const recruiterId = req.userId;
    const allPostedJobs = this.jobModel.getAllJobsByRecruiter(recruiterId);
    return res.render("posted-jobs", { jobs: allPostedJobs });
  }

  viewAllApplicants(req, res) {
    const jobId = req.params.id;
    const job = this.jobModel.getJobById(jobId);
    const applications = this.applicationModel.getAllApplicationsOfAJob(
      job.applicants
    );
    return res.render("user-applications", { applications });
  }

  // Deleting a posted job
  deleteAJob(req, res) {
    const jobId = req.params.id;
    this.jobModel.deleteAJob(jobId);
    return res.redirect("/get-posted-jobs");
  }
}
