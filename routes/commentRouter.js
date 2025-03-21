const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentsController");

router.get("/:postId", commentController.showComment);
router.post("/", commentController.postComment);

module.exports = router;
