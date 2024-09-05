const express = require("express");
const path = require("node:path");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./passport");

// const db = require("./db/queries");

// const session = require("express-session");
// const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
// const { PrismaClient } = require("@prisma/client");

// const passport = require("passport");
// // const bcrypt = require("bcryptjs");
// const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(bodyParser.json());

// const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const authRouter = require("./routes/auth");

// const folderRouter = require("./routes/folderRouter");
// const fileRouter = require("./routes/fileRouter");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(
//   session({
//     secret: "cats",
//     resave: false,
//     saveUninitialized: false,
//     store: new PrismaSessionStore(new PrismaClient(), {
//       checkPeriod: 2 * 60 * 1000, //ms
//       dbRecordIdIsSessionId: true,
//       dbRecordIdFunction: undefined,
//     }),
//   })
// );
// app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// passport.use(
//   new LocalStrategy(
//     { usernameField: "email", passwordField: "password" },
//     async (email, password, done) => {
//       try {
//         const user = await db.getUserByEmail(email);

//         if (!user) {
//           return done(null, false, { message: "Incorrect email" });
//         }
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//           return done(null, false, { message: "Incorrect password" });
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await db.findUserById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// app.use("/", indexRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/posts", passport.authenticate("jwt", { session: false }), postRouter);
app.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRouter
);
app.use("/auth", authRouter);

// app.use("/folder", folderRouter);
// app.use("/file", fileRouter);

// app.get("/login", (req, res) => res.render("login"));
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(400).render("/", {
//         errors: [{ msg: "Error logging out." }],
//       });
//     }
//     res.redirect("/");
//   });
// });

const PORT = 3000;
app.listen(PORT, () => console.log(`Blog API - listening on port ${PORT}!`));
