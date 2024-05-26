import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve("public", "images", "resumes")));
  },
  filename: function (req, file, cb) {
    const uniqueFileName = Date.now() + "-" + file.fieldname + ".jpg";
    // Setting up the resume path in request for storage.
    req.resumePath = `/images/resumes/${uniqueFileName}`;
    cb(null, uniqueFileName);
  },
});

export const fileUploadMiddleware = multer({ storage });
