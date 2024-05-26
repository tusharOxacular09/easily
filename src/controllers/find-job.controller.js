import JobModel from "../models/job.model.js";

export default class JobController {
  // Instantiate JobModel
  jobModel = new JobModel();

  // Render all jobs
  renderAllJobs = (req, res) => {
    const jobs = this.jobModel.getAllJobs();
    return res.render("jobs", { jobs });
  };

  getSingleJob = (req, res) => {
    const id = req.params.id;
    const searchedJob = this.jobModel.getJobById(id);
    return res.render("job-details", { job: searchedJob });
  };
}
