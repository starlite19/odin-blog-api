const db = require("../db/queries");

async function getComment(req, res) {
  const commentId = req.params.commentId;
  const comment = await db.getComment(commentId);
  res.json(comment);
}

async function updateComment(req, res) {
  const commentId = req.params.commentId;
  const { content } = req.body;
  const updatedComment = await db.updateComment(commentId, content);
  res.json(updatedComment);
}

async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  const deletedComment = await db.deleteComment(commentId);
  res.json(deletedComment);
}

module.exports = {
  getComment,
  updateComment,
  deleteComment,
};
