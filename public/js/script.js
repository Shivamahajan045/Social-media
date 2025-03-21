const form = document.querySelector("form");
const postContainer = document.querySelector("#post");

document.addEventListener("DOMContentLoaded", fetchAllPosts);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const postLink = e.target.postLink.value;
  const postDescription = e.target.postDescription.value;

  let postObj = {
    postLink: postLink,
    postDescription: postDescription,
  };

  axios
    .post("http://localhost:3000/post", postObj)
    .then((result) => {
      // console.log("data sent to backend");
      // console.log(result);
      fetchAllPosts();
    })
    .catch((err) => {
      console.log(err);
    });

  form.reset();
});

function fetchAllPosts() {
  axios
    .get("http://localhost:3000/post")
    .then((result) => {
      postContainer.innerHTML = ""; // Clear previous posts
      result.data.forEach((post) => {
        let postDiv = document.createElement("div");

        postDiv.classList.add(
          "post",
          "p-3",
          "m-2",
          "border",
          "rounded",
          "shadow-sm"
        );

        let postImg = document.createElement("img");
        postImg.classList.add("img-fluid", "rounded", "border", "shadow");
        postImg.src = post.postUrl;
        postImg.alt = "Invalid img";
        postImg.style.height = "200px";
        postImg.style.width = "200px";

        let para = document.createElement("p");
        para.textContent = post.description;
        para.classList.add("mt-2", "fw-semibold");

        let commentBtn = document.createElement("button");
        commentBtn.classList.add("btn", "btn-outline-primary", "btn-sm", "m-2");
        commentBtn.textContent = "Comment";

        let commentSection = document.createElement("div");
        commentSection.style.display = "none";
        commentSection.innerHTML = `
<form class="comment-form ">
  <input type="text" name="commentInput" class="form-control m-2" placeholder="Write a comment">
  <button type="submit" class="btn btn-primary btn-sm m-2">Send</button>
</form>
<div class="comments m-2"></div> <!-- Comments will be added here -->
`;

        let commentForm = commentSection.querySelector(".comment-form");
        let commentsContainer = commentSection.querySelector(".comments");

        // Fetch and show existing comments
        fetchComments(post.id, commentsContainer);

        // Toggle comment section
        commentBtn.addEventListener("click", () => {
          commentSection.style.display =
            commentSection.style.display === "none" ? "block" : "none";
        });

        // Handle new comment submission
        commentForm.addEventListener("submit", (e) => {
          e.preventDefault();
          let commentText = e.target.commentInput.value;
          if (commentText) {
            axios
              .post("http://localhost:3000/comment", {
                postId: post.id,
                comment: commentText,
              })
              .then(() => {
                let newComment = document.createElement("p");
                newComment.textContent = commentText;
                newComment.classList.add("bg-light", "p-1", "rounded");
                commentsContainer.appendChild(newComment);
                e.target.reset();
              });
          } else {
            alert("Please enter a comment!");
          }
        });

        postDiv.appendChild(postImg);
        postDiv.appendChild(para);
        postDiv.appendChild(commentBtn);
        postDiv.appendChild(commentSection);
        postContainer.appendChild(postDiv);
      });
    })
    .catch((err) => console.log(err));
}

function fetchComments(postId, commentsContainer) {
  axios.get(`http://localhost:3000/comment/${postId}`).then((result) => {
    commentsContainer.innerHTML = "";
    result.data.forEach((comment) => {
      let commentText = document.createElement("p");
      commentText.textContent = comment.comment;
      commentsContainer.appendChild(commentText);
    });
  });
}
