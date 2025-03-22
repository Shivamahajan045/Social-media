const express = require("express");
const app = express();
const Comment = require("../models/comment");

const showComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    let comments = await Comment.findAll({ where: { postId } });

    if (!comments.length) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const postComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    // console.log(postId, comment);
    // Validation check
    if (!postId || !comment) {
      return res
        .status(400)
        .json({ message: "Post ID and comment are required" });
    }
    let newComment = await Comment.create({
      postId: postId,
      comment: comment,
    });
    res.status(201).json({ newComment });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  showComment,
  postComment,
};
