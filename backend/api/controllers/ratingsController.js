const db = require("../models");
const { Op } = require("sequelize");

exports.getRatings = async (req, res) => {
    try {
        const ratings = await db.ratings.findAll({ where: { postid: req.params.postid } });
        return res.json({
            status: 1,
            ratings: ratings
        });
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message: error.message || "Some errors occur while finding ratings"
        });
    }
};

exports.createRating = (req, res) => {
    const rating = {
        userid : req.body.userid,
        postid : req.body.postid,
        rating : req.body.rating,
        created : Date.now(),
        updated : Date.now()
    }
    db.ratings.create(rating)
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
            err.message || "Some errors occur while creating new rating"
        });
    });
};

exports.updateRating = (req, res) => {
    const rating = {
        rating : req.body.rating,
        updated : Date.now()
    }
    db.ratings.update(rating, {
        where: {
            ratingid: req.body.ratingid,
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
            err.message || "Some errors occur while updating rating"
        });
    });
};

exports.deleteRating = (req, res) => {
    db.ratings.destroy({
        where: {
            ratingid: req.params.ratingid,
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
            err.message || "Some errors occur while deleting rating"
        });
    });
};

exports.getPostAverageRatings = async (req, res) => {
    try {
        const ratings = await db.ratings.findAll({ where: { postid: req.params.postid } });
        let sumRatings = 0;
        let i;
        for(i = 0; i < ratings.length; i++){
            sumRatings += ratings[i].rating;
        }
        let averageRating = ratings.length ? parseFloat((sumRatings/ratings.length).toFixed(1)) : 0;
        let nRatings = ratings.length ? ratings.length : 0;
        return res.json({
            status: 1,
            averageRating: averageRating,
            nRatings: nRatings
        });
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message: error.message || "Some errors occur while finding ratings"
        });
    }
};
exports.getUserAverageRatings = async (req, res) => {
    try {
        const posts = await db.posts.findAll({ where: { userid: req.params.userid } });
        let i;
        let sumUserRatings = 0;
        let countPost = 0;
        let nRatings = 0;
        for(i = 0; i < posts.length; i++){
            let postid = posts[i].postid;
            const ratings = await db.ratings.findAll({ where: { postid: postid } });
            let sumPostRatings = 0;
            let j;
            for(j = 0; j < ratings.length; j++){
                sumPostRatings += ratings[j].rating;
            }
            nRatings += ratings.length ? ratings.length : 0;
            if(sumPostRatings > 0) {
                sumUserRatings += sumPostRatings/ratings.length;
                countPost += 1;
            }
        }
        let averageRating = 0;
        if(countPost > 0){
            averageRating = parseFloat((sumUserRatings/countPost).toFixed(1));
        }
        return res.json({
            status: 1,
            averageRating: averageRating,
            nRatings: nRatings
        });
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message: error.message || "Some errors occur while finding ratings"
        });
    }
};
