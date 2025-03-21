const express = require("express");
const app = express();
const Post = require("../models/post");

const getPosts = (req, res) => {
  Post.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};

const addPost = (req, res) => {
  let { postLink, postDescription } = req.body;
  Post.create({
    postUrl: postLink,
    description: postDescription,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getPosts,
  addPost,
};
