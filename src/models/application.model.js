import { applicants } from "../database/applicants.collection.js";
import { generateRandomAlphaNumeric } from "../helper/ubiqueid.helper.js";
import { jobs } from "../database/job.collection.js";

export default class ApplicationModel {
  getAllApplications(id) {
    const userApplications = [];
    applicants.map((application) => {
      if (application.applicantId === id) {
        userApplications.push(application);
      }
    });
    return userApplications;
  }

  getAllApplicationsOfAJob(applications) {
    const userApplications = [];
    applications.map((application) => {
      const foundApplication = applicants.find(
        (app) => app.applicationId === application
      );
      if (foundApplication) {
        userApplications.push(foundApplication);
      }
    });

    return userApplications;
  }

  submitApplication(application, jobId) {
    // craete an unique application Id
    const applicationId = "app-" + generateRandomAlphaNumeric(4);
    applicants.push({ applicationId, ...application });
    // pushhing the application id inside the job for countimng total number of applicants.
    const appliedJobIndex = jobs.findIndex((job) => job.id === jobId);
    jobs[appliedJobIndex].applicants.push(applicationId);
  }
}
