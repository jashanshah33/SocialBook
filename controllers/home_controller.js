const Post = require("../models/post");
const User = require("../models/user");
const Chat = require("../models/chat");
const Friends = require("../models/friends");

module.exports.home = async function (req, res) {
  // Post.find({})
  //   .populate("user")
  //   .populate({ path: "comments", populate: { path: "user" } })
  //   .exec(function (err, post) {
  //     if (err) {
  //       console.log("Error while fetching posts.");
  //     }
  //     User.find({}, function (err, user) {
  //       return res.render("home", {
  //         title: "Home",
  //         posts: post,
  //         allUsers: user
  //       });
  //     });
  //   });

  //using async await
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: { path: "likes" },
        populate: { path: "user" },
      })
      .populate({
        path: "likes",
        populate: { path: "user" },
      });

    for (const p of posts) {
      p.comments.reverse();
    }

    let users = await User.find({});

    let chat = await Chat.find({}).populate("user");

    let friends;
    if (req.user) {
      friends = await Friends.find({ user: req.user.id }).populate("user_to");
    }else{
      friends = []
    }

    return res.render("home", {
      title: "Home",
      posts: posts,
      allUsers: users,
      chat: chat,
      friends: friends,
    });
  } catch (error) {
    req.flash("error", error);
    return;
  }
};
