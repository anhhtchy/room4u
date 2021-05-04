const db = require("../models");
const { Op } = require("sequelize");

exports.getReviews = async (req, res) => {
    try {
        const reviews = await db.reviews.findAll({ where: { postid: req.params.postid } });
        return res.json({
            status: 1,
            reviews: reviews
        });
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message: error.message || "Some errors occur while finding reviews"
        });
    }
};

exports.createReview = (req, res) => {
    const review = {
        userid : req.body.userid,
        postid : req.body.postid,
        rating : req.body.rating,
        comment : req.body.comment,
        created : Date.now(),
        updated : Date.now()
    }
    db.reviews.create(review)
    .then(data =>{
        return res.json({
            status: 1,
            data: data
        });
    })
    .catch(err =>{
        return res.status(500).send({
            status: 0,
            message:
            err.message || "Some errors occur while creating new review"
        });
    });
};

exports.updateReview = (req, res) => {
    const review = {
        rating : req.body.rating,
        comment : req.body.comment,
        updated : Date.now()
    }
    db.reviews.update(review, {
        where: {
            reviewid: req.body.reviewid,
        },
    })
    .then(() => {
        return res.json({
            status: 1,
        });
    })
    .catch(err =>{
        return res.status(500).send({
            status: 0,
            message:
            err.message || "Some errors occur while updating review"
        });
    });
};

exports.deleteReview = (req, res) => {
    db.reviews.destroy({
        where: {
            reviewid: req.params.reviewid,
        },
    })
    .then(() => {
        return res.json({
            status: 1,
        });
    })
    .catch(err =>{
        return res.status(500).send({
            status: 0,
            message:
            err.message || "Some errors occur while deleting review"
        });
    });
};

exports.deletePost = (req, res, next) => {
    db.posts
        .destroy({
            where: { postid: req.params.pid },
        })
        .then((data) => {
            res.status(200).send({
                message: "Deleted post with id ${req.params.pid}",
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: err.message || "Cannot delete that post!",
            });
        });
};

exports.deleteAllPostByUserId = (req, res, next) => {
    db.posts
        .destroy({
            where: { userid: req.params.id },
        })
        .then((data) => {
            res.status(200).send({
                message:
                    "Deleted post with id all post of user with id" + req.params.id,
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: err.message || "Cannot delete all posts!",
            });
        });
};

exports.getDistricts = (req, res, next) => {
    db.districts.findAll({
        where: {
            cityid: '01'
        }
    }).then((data) => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Cannot get disctricts"
        });
    });
}
exports.getHomePosts = async (req, res, next) => {
    try {
        const [data0, data1, data2, data3] = await Promise.all([
            db.posts.findAll({
                where: { estatetype: 0 },
                order: [["updated", "DESC"]],
                limit: 10
            }),
            db.posts.findAll({
                where: { estatetype: 1 },
                order: [["updated", "DESC"]],
                limit: 10
            }),
            db.posts.findAll({
                where: { estatetype: 2 },
                order: [["updated", "DESC"]],
                limit: 10
            }),
            db.posts.findAll({
                where: { estatetype: 3 },
                order: [["updated", "DESC"]],
                limit: 10
            })
        ]);
        res.send({ data0, data1, data2, data3 })
    }
    catch (error) {
        res.status(500).send({
            status: 0,
            message: error.message || "Error when trying to get data"
        })
    }
}