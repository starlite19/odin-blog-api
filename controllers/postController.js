const db = require("../db/queries");

async function getAllPosts(req, res) {
  const posts = await db.getAllPosts();
  res.json(posts);
}

async function getPost(req, res) {
  const postId = req.params.postId;
  const post = await db.getPost(postId);
  res.json(post);
}

async function deletePost(req, res) {
  const postId = req.params.postId;
  const deletedPost = await db.deletePost(postId);
  res.json(deletePost);
}

async function updatePost(req, res) {
  const postId = req.params.postId;
  const updatedPost = await db.updatePost(
    postId,
    req.query.title,
    req.query.content,
    req.query.published
  );
  res.json(updatedPost);
}

async function createPost(req, res) {
  const user = req.user;
  const { title, content } = req.body;
  const newPost = await db.createPost(title, content, user.id);
  res.json(newPost);
}

module.exports = {
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
};
