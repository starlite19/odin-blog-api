const { Router } = require("express");
const commentController = require("../controllers/commentController");
const commentRouter = Router();

commentRouter.get("/");
module.exports = commentRouter;
