import express from "express";
import "dotenv/config.js";
import router from "./routers.js";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";

// initializing server
const server = express();

// global middlewares

// Session Configuration
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note: Set to true if using HTTPS
  })
);

// Middleware to set locals for EJS templates
server.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.user ? true : false;
  res.locals.username = req.session.user
    ? req.session.user.name.split(" ")[0]
    : "";
  next();
});

// Setting up the cookies
server.use(cookieParser());

// static directory
server.use(express.static("public"));

// express layout
server.use(expressEjsLayouts);

// Set the view engine to ejs
server.set("view engine", "ejs");

// Parsing Request Body
server.use(express.urlencoded({ extended: true }));

// Set the directory where the template files are located
server.set("views", path.join(path.resolve("src", "views")));

// Router
server.use("/", router);

export { server };
