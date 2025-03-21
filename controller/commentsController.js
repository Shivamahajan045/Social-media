const express = require("express");
const app = express();
const Comment = require("../models/comment");

const showComment = (req, res) => {
  const postId = req.params.postId;
  Comment.findAll({ where: { postId } })
    .then((comments) => res.json(comments))
    .catch((err) => console.log(err));
};

const postComment = (req, res) => {
  const { postId, comment } = req.body;
  // console.log(postId, comment);
  Comment.create({ postId: postId, comment: comment })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  showComment,
  postComment,
};
