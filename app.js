const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./passport");

const app = express();
app.use(bodyParser.json());

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/posts", passport.authenticate("jwt", { session: false }), postRouter);
app.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRouter
);
app.use("/auth", authRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Blog API - listening on port ${PORT}!`));
