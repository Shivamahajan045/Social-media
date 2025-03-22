const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const sequelize = require("./utils/database");
const Post = require("./models/post");
const Comment = require("./models/comment");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/post", postRouter);

app.use("/comment", commentRouter);

app.use(errorHandler);

Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId" });

sequelize
  .sync({ force: false })
  .then((result) => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error in connecting DB", err);
  });

app.listen(3000, () => {
  console.log(`Server is listening to port 3000`);
});
