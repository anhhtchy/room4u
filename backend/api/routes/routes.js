const fileUpload = require("../middleware/file-upload.js");

module.exports = function (app) {
    let accountsController = require("../controllers/accountsController");
    let postsController = require("../controllers/postsController");
    let upload = require('../middleware/file-upload.js');


    // register
    app.route("/register").post(accountsController.createAccount);
    // search
    app.route("/search").post(postsController.searchPost);
    // login
    app.route("/login").post(accountsController.login);
    // logout
    app.route("/logout").post(accountsController.logout);
    app.route("/user/:userid").get(accountsController.getAccount);
    // refresh token
    app.route("/refreshtoken").post(accountsController.refreshToken);
    app.route("/home").get(postsController.getHomePosts);
    app.route("/home/:id").get(postsController.getPostsByUserId);
    app.route("/:id/createPost").post(postsController.createPost);
    app.route("/:id/updatePost").put(postsController.updatePost);
    app.route("/:id/deletePost/:pid").delete(postsController.deletePost);
    app
        .route("/:id/deleteAllPosts")
        .delete(postsController.deleteAllPostByUserId);
    app.route('/getDistricts').get(postsController.getDistricts);
    // reviews apis
    let reviewsController = require("../controllers/reviewsController");
    app.route("/reviews/create").post(reviewsController.createReview);
    app.route("/reviews/:postid").get(reviewsController.getReviews);
    app.route("/reviews/update").put(reviewsController.updateReview);
    app.route("/reviews/delete/:reviewid").delete(reviewsController.deleteReview);
    // Đây là đoạn test up ảnh nhé
    app.post(':id/:pid/upload', fileUpload.any(), (req, res, next) => {
        file = req.files;
        res.send(file);
    })
};