const Post = require("../models/post");

const getPosts = async (req, res) => {
  try {
    let posts = await Post.findAll();
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const addPost = async (req, res) => {
  try {
    let { postLink, postDescription } = req.body;
    // Validation check
    if (!postLink || !postDescription) {
      return res.status(400).json({
        message: "Post link and description are required",
      });
    }
    const newPost = await Post.create({
      postUrl: postLink,
      description: postDescription,
    });
    res.status(201).json({ newPost });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  addPost,
};
