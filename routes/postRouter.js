const { Router } = require("express");
const postController = require("../controllers/postController");
const postRouter = Router();

postRouter.get("/", postController.getAllPosts); // get all blog posts
postRouter.post("/", postController.createPost); // create a blog post
postRouter.get("/:postId", postController.getPost); // get a single post
postRouter.put("/:postId", postController.updatePost); // update a single post
postRouter.delete("/:postId", postController.deletePost); // delete a single post

module.exports = postRouter;
