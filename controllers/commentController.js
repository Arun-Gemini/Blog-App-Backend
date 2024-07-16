// import the controller

const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// business logic

exports.createComment = async(req,res) => {
     try{
          // creating comment with alternative way using save function
          // for this we have to make sure that we have already made the object for the commment 

          // fetch data from req body

          const{post, user, body} = req.body;

          // crete comment
          const comment = new Comment({
               post, user, body
          });
     
          const savedComment = await comment.save();

          // find the post to make changes in the post section

          const updatedPost = await Post.findByIdAndUpdate(post, {$push : {comments : savedComment._id}}, {new : true})
                              .populate("comments") // populate the comments array with comment documents
                              .exec();

          res.json({
               post : updatedPost,
          });
     }
     catch(error){
          return res.status(500).json({
               error : "Error while creating comment",
          });
     }
}