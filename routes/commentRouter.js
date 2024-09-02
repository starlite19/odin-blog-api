const { Router } = require("express");
const commentController = require("../controllers/commentController");
const commentRouter = Router();

commentRouter.get("/:commentId", commentController.getComment); // get a comment
commentRouter.put("/:commentId", commentController.updateComment); // update comment
commentRouter.delete("/:commentId", commentController.deleteComment); // delete comment

module.exports = commentRouter;
