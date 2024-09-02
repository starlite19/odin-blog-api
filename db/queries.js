const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

async function getPost(postId) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
    include: { comments: true },
  });

  return post;
}

async function deletePost(postId) {
  const deletedPost = await prisma.post.delete({
    where: {
      id: parseInt(postId),
    },
  });

  return deletedPost;
}

async function updatePost(postId, title, content, published) {
  let updatedPost;
  if (title) {
    updatedPost = await prisma.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        title: title,
      },
    });
  }

  if (content) {
    updatedPost = await prisma.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        content: content,
      },
    });
  }

  if (typeof published !== "undefined") {
    updatedPost = await prisma.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        published: published,
      },
    });
  }
  return updatedPost;
}

async function createPost(title, content, authorId) {
  const newPost = await prisma.post.create({
    data: {
      title: title,
      author: {
        connect: { id: authorId },
      },
      content: content,
    },
  });

  return newPost;
}

async function getCommentsFromPost(postId) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: parseInt(postId),
    },
  });

  return comments;
}

async function getComment(commentId) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: parseInt(commentId),
    },
  });

  return comment;
}

async function createCommentUnderPost(postId, userId, content) {
  const comment = await prisma.comment.create({
    data: {
      post: {
        connect: { id: parseInt(postId) },
      },
      user: {
        connect: { id: parseInt(userId) },
      },
      content: content,
    },
  });

  return comment;
}

async function updateComment(commentId, content) {
  const updatedComment = await prisma.comment.update({
    where: {
      id: parseInt(commentId),
    },
    data: {
      content: content,
    },
  });

  return updatedComment;
}

async function deleteComment(commentId) {
  const deletedComment = await prisma.comment.delete({
    where: {
      id: parseInt(commentId),
    },
  });

  return deletedComment;
}

module.exports = {
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
  getCommentsFromPost,
  getComment,
  createCommentUnderPost,
  updateComment,
  deleteComment,
};
