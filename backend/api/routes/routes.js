module.exports = function (app) {
  let accountsController = require("../controllers/accountsController");
  let postsController = require("../controllers/postsController");
  //API register
  app.route("/register").post(accountsController.createAccount);
  // search
  app.route("/search").post(postsController.searchPost);
};
