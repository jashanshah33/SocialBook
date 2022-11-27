const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const postsController = require("../controllers/posts_controller");

console.log("Router LOaded");

router.get("/", homeController.home);
router.get("/signup", homeController.signup);
router.get("/login", homeController.login);
router.get("/posts", postsController.posts);
router.use("/users", require("./users"));

module.exports = router;
