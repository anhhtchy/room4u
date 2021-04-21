module.exports = function (app) {
  let accountsController = require("../controllers/accountsController");
  //API register
  app.route("/register").post(accountsController.createAccount);
  // search
  let postsController = require("../controllers/postsController");
  app.route("/search").post(postsController.searchPost);
};
