module.exports = function (app) {
  let accountsController = require("../controllers/accountsController");
  let postsController = require("../controllers/postsController");
  // register
  app.route("/register").post(accountsController.createAccount);
  // search
  app.route("/search").post(postsController.searchPost);
  // login
  app.route("/login").post(accountsController.login);
  // refresh token
  app.route("/refreshtoken").post(accountsController.refreshToken);
  app.route("/home").get(postsController.getAllPosts);
  app.route("/home/:id").get(postsController.getPostsByUserId);
  app.route("/:id/createPost").post(postsController.createPost);
  app.route("/:id/updatePost").put(postsController.updatePost);
  app.route("/:id/deletePost/:pid").delete(postsController.deletePost);
  app
    .route("/:id/deleteAllPosts")
    .delete(postsController.deleteAllPostByUserId);
  app.route('/getDistricts').get(postsController.getDistricts);
};
