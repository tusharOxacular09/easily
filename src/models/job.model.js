import { jobs } from "../database/job.collection.js";
import { generateRandomAlphaNumeric } from "../helper/ubiqueid.helper.js";

export default class JobModel {
  // Get All Jobs
  getAllJobs() {
    return jobs;
  }

  // Create a job
  createAJob(job) {
    // Creating unique Id for the Job
    const uniqueId = "job-" + generateRandomAlphaNumeric(4);
    const newJob = {
      id: uniqueId,
      recruiterId: job.recruiterId,
      category: job.jobCategory,
      designation: job.jobDesignation,
      location: job.jobLocation,
      companyName: job.companyName,
      minSalary: Number(job.salaryMin),
      maxSalary: Number(job.salaryMax),
      applyBy: job.applyBy,
      skills: job.skillsRequired.split(",").map((skill) => skill.trim()),
      numberOfOpenings: Number(job.numberOfPostings),
      jobPosted: job.jobPostedDate,
      applicants: [],
    };

    // pushing the new job to the end of the array
    jobs.push(newJob);
  }

  getJobById(id) {
    const searchedJob = jobs.find((job) => job.id === id);
    return searchedJob;
  }

  getAllJobsByRecruiter(id) {
    const alljobs = [];
    jobs.map((job) => {
      if (job.recruiterId === id) {
        alljobs.push(job);
      }
    });
    return alljobs;
  }

  deleteAJob(id) {
    const findJobIndex = jobs.findIndex((job) => job.id === id);
    jobs.splice(findJobIndex, 1);
  }
}
