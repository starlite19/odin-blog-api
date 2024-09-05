const { Router } = require("express");
const userController = require("../controllers/userController");
const authRouter = Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

authRouter.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something went wrong.",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, "mysecretkeyy");
      return res.json({ user, token });
    });
  })(req, res);
});

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "logged out" });
  });
});

authRouter.post("/signup", userController.createUser);

module.exports = authRouter;
