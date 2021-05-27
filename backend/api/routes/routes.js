module.exports = function (app) {
  let accountsController = require("../controllers/accountsController");
  let postsController = require("../controllers/postsController");
  let fileUpload = require("../middleware/file-upload.js");
  let imagesComtroller = require("../controllers/imagesController");
  let authMiddleWare = require("../middleware/authMiddleware");
  // register
  app.route("/register").post(accountsController.createAccount);
  // search
  app.route("/search").post(postsController.searchPost);
  // login
  app.route("/login").post(accountsController.login);
  // logout
  app.route("/logout").post(accountsController.logout);
  app.route("/user/:userid").get(accountsController.getAccount);
  app.route("/changepassword").post(accountsController.changePassword);
  // sentOtp
  app.route("/sendotp").post(accountsController.sendOtp);
  app.route("/checkotp").post(accountsController.checkOtp);
  app.route("/forgetpassword").post(accountsController.forgetPassword);

  // refresh token
  app.route("/refreshtoken").post(accountsController.refreshToken);

  //edit profile
  app.route("/:id/changeProfile").put(accountsController.updateProfile);
  //admin thống kê
  app.route("/adminStatistic").get(accountsController.adminStatistic);
  app.route("/postStatistic").get(postsController.postStatistic);

  app.route("/home").get(postsController.getHomePosts);
  // app
  //   .route("/home/:id")
  //   .get(authMiddleWare.isOwner, postsController.getPostsByUserId);
  app.route("/home/:id").get(postsController.getPostsByUserId);
  app.route("/getPost/:pid").get(postsController.getPostById);

  app.route("/:id/createPost").post(postsController.createPostWithImages);
  app.route("/:id/updatePost/:pid").put(postsController.updatePost);
  app.route("/:id/deletePost/:pid").delete(postsController.deletePost);
  app
    .route("/:id/deleteAllPosts")
    .delete(postsController.deleteAllPostByUserId);
  app.route("/getDistricts").get(postsController.getDistricts);
  // comments apis
  let commentsController = require("../controllers/commentsController");
  app.route("/comments/create").post(commentsController.createComment);
  app.route("/comments/:postid").get(commentsController.getComments);
  app.route("/comments/update").put(commentsController.updateComment);
  app
    .route("/comments/delete/:commentid")
    .delete(commentsController.deleteComment);
  // ratings apis
  let ratingsController = require("../controllers/ratingsController");
  app.route("/ratings/create").post(ratingsController.createRating);
  app.route("/ratings/:postid").get(ratingsController.getRatings);
  // rating của 1 user cho 1 post
  app.route("/rating/:userid&:postid").get(ratingsController.getUserRating);
  app.route("/ratings/update").put(ratingsController.updateRating);
  app.route("/ratings/delete/:ratingid").delete(ratingsController.deleteRating);
  // trung bình rating của post
  app
    .route("/ratings/average/:postid")
    .get(ratingsController.getPostAverageRatings);
  // trung bình rating các post của user
  app
    .route("/ratings/averageuser/:userid")
    .get(ratingsController.getUserAverageRatings);
  // Đây là đoạn test up ảnh nhé
  app.route("/upload").post(fileUpload.any(), imagesComtroller.uploadImages);
  app.route("/:pid/imgs").get(imagesComtroller.getImagesByPostId);

  //save
  app.route("/save").post(postsController.savePosts);
  app.route("/save/:userid").get(postsController.getSavePostsByUserid);
  app.route("/unsave/:userid&:postid").delete(postsController.deleteSavePosts);
  app.route("/:id/deleteProfile").post(accountsController.deleteProfile);

  // quan ly nguoi dung
  app.route("/searchUser").post(accountsController.searchUser);
};
