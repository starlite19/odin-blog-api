const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/", userController.getAllUsers); // get all users
userRouter.get("/author", userController.getAllAuthors); // get blog authors
userRouter.get("/regular", userController.getRegularUsers); // get regular users
userRouter.get("/:userId", userController.getUser); // get single user

userRouter.post("/", userController.createUser); // create user

userRouter.put("/:userId", userController.updateUser); // update user

userRouter.delete("/:userId", userController.deleteUser); // delete user

module.exports = userRouter;
