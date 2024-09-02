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
        title: tile,
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

module.exports = {
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
};
