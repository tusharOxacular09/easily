import AuthModel from "../models/auth.model.js";

export default class AuthController {
  constructor() {
    this.authModel = new AuthModel();
    // Binding the constructor
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  // Rendering login page
  renderLoginPage(req, res) {
    return res.render("login", { errorMessage: null, successMessage: null });
  }
  renderRegisterPage(req, res) {
    return res.render("register", { errorMessage: null, successMessage: null });
  }

  registerUser(req, res) {
    const newUser = req.body;
    try {
      this.authModel.createUser(newUser);
      return res.render("login", { errorMessage: null, successMessage: null });
    } catch (error) {
      console.error("Error while creating user: ", error);
      return res.render("register", {
        errorMessage: "Failed to create the user. Please try again.",
        successMessage: null,
      });
    }
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const validateUser = this.authModel.validateUser(email, password);
      if (validateUser) {
        // set the secrete token in side users browser.
        req.session.user = { id: validateUser.id, name: validateUser.name };
        return res.redirect("/find-job");
      }
      return res.render("login", {
        errorMessage: "Invalid user credentials. Please try again.",
        successMessage: null,
      });
    } catch (error) {
      console.error("Error while login: ", error);
      return res.render("login", {
        errorMessage: "Failed to login the user. Please try again.",
        successMessage: null,
      });
    }
  }

  logoutUser(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Error logging out");
      }
      return res.redirect("/");
    });
  }
}
