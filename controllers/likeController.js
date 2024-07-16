
const Like = require("../models//likeModel");
const Post = require("../models/postModel");

exports.likePost = async(req,res) => {
     try{
          const {post, user} = req.body;
          const like = new Like({
               post,user,
          });

          const savedLike = like.save();

          // update the post collection on the basis of this

          const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new : true}).populate("comments").exec(); 

          res.json({
               post : updatedPost
          })
     }
     catch(error){
          return res.status(400).json({
               error : "Error while making a like",
          })
     }
}

exports.unlikePost = async(req,res) => {
     try{
          const {post, like} = req.body;
          const deletedLike = await Like.findOneAndDelete({post : post, _id : like});

          // update the post collection

          const updatedPost = await Post.findByIdAndDelete(post, {$pull : {likes : deletedLike._id}}, {new : true});

          res.json({
               post : updatedPost,
          });
     }
     catch(error){
          return res.status(400).json({
               error: "Error while unliking a post"
          });
     }
}

exports.dummyLink = (req,res) => {
     res.send("This is your dummy page")
}