import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export const NotifyEmail = async (
  email,
  applicantName,
  jobTitle,
  companyName
) => {
  try {
    // Creating transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OFFCIAL_EMAIL,
        pass: process.env.OFFCIAL_PASSWORD,
      },
    });

    // Html Page
    const html = await ejs.renderFile(
      path.join(path.resolve("src", "views", "job-application-email.ejs")),
      {
        applicantName,
        jobTitle,
        companyName,
      }
    );

    const mailOptions = {
      from: process.env.OFFCIAL_EMAIL,
      to: email,
      subject: "Job Application Successful",
      html,
    };

    await transporter.sendMail(mailOptions);

    return "Email sent successfully";
  } catch (error) {
    console.log(error);
  }
};
