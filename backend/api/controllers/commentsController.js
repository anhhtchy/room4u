const db = require("../models");
const { Op } = require("sequelize");

exports.getComments = async (req, res) => {
    try {
        const comments = await db.comments.findAll({ where: { postid: req.params.postid } });
        return res.json({
            status: 1,
            comments: comments
        });
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message: error.message || "Some errors occur while finding comments"
        });
    }
};

exports.createComment = (req, res) => {
    const comment = {
        userid : req.body.userid,
        postid : req.body.postid,
        comment : req.body.comment,
        created : Date.now(),
        updated : Date.now()
    }
    db.comments.create(comment)
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
            err.message || "Some errors occur while creating new comment"
        });
    });
};

exports.updateComment = (req, res) => {
    const comment = {
        comment : req.body.comment,
        updated : Date.now()
    }
    db.comments.update(comment, {
        where: {
            commentid: req.body.commentid,
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
            err.message || "Some errors occur while updating comment"
        });
    });
};

exports.deleteComment = (req, res) => {
    db.comments.destroy({
        where: {
            commentid: req.params.commentid,
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
            err.message || "Some errors occur while deleting comment"
        });
    });
};
