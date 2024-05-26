// Middleware to protect routes
export const authMiddleware = (req, res, next) => {
  if (req?.session?.user) {
    req.userId = req.session.user.id;
    next();
  } else {
    return res.redirect("/login");
  }
};
