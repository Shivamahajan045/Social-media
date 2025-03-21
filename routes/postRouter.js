const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.get("/", postController.getPosts);
router.post("/", postController.addPost);

module.exports = router;
