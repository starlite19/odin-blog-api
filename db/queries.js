const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPosts() {
  const posts = await prisma.post.findMany({ include: { comments: true } });
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
        published: published.toLowerCase() === "true",
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

async function getAllUsers() {
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  return users;
}

async function getAuthors() {
  const authors = await prisma.user.findMany({
    where: {
      role: {
        equals: "AUTHOR",
      },
    },
    include: { posts: true },
  });
  return authors;
}

async function getUsers() {
  const users = await prisma.user.findMany({
    where: {
      role: {
        equals: "USER",
      },
    },
    include: { posts: true },
  });
  return users;
}

async function getUser(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    include: { posts: true },
  });
  return user;
}

async function createUser(email, pass) {
  const user = await prisma.user.create({
    data: {
      email: email,
      password: pass,
    },
  });
  return user;
}

async function updateUser(userId, role) {
  const user = await prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      role: role,
    },
  });
  return user;
}

async function deleteUser(userId) {
  const user = await prisma.user.delete({
    where: {
      id: parseInt(userId),
    },
  });
  return user;
}

async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: { posts: true },
  });
  return user;
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
  getAllUsers,
  getAuthors,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
