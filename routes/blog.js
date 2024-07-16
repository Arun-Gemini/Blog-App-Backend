
const express = require("express");
const router = express.Router();

// import the controller
const {dummyLink, likePost, unlikePost} = require("../controllers/LikeController");
const { createComment } = require("../controllers/CommentController");
const { createPost, getAllPosts } = require("../controllers/postController");


// create mapping

router.get("/dummyLink", dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

// export
module.exports = router;