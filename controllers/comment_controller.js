const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function (req, res) {
  //console.log(req.body);
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("Error while matching Post");
      return;
    }
    if (post) {
      Comment.create(
        {
          comment: req.body.comment,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("Error while creating Comments");
            return;
          }
          post.comments.push(comment);
          post.save();
          return res.redirect("back");
        }
      );
    }
  });
};

module.exports.destroyComment = function (req, res) {

  Comment.findById(req.query.id, function (err, comment) {
    Post.findById(comment.post, function (err, post) {
      if (comment.user == req.user.id || post.user == req.user.id) {
        let postId = comment.post;
        comment.remove();
        Post.findByIdAndUpdate(
          postId,
          { $pull: { comments: req.query.id } },
          function (err, post) {
            return res.redirect("back");
          }
        );
      } else {
        return res.redirect("back");
      }
    });
  });
};