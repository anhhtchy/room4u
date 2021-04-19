const db = require('../models');
let bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const { Op } = require("sequelize");

exports.createAccount = async (req, res) => {
    const username = await db.accounts.findOne({where: {username: req.body.username}});
    const email = await db.accounts.findOne({where: {email: req.body.email}});
    if(username !== null){
        res.status(400).send({
            status: 0,
            message: "username already exists"
        });
    } else if (email !== null){
        res.status(400).send({
            status: 0,
            message: "email already exists"
        });
    } else{
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if(err){
                return res.status(500).send({
                    status: 0,
                    message:
                    err.message || "Some errors occur while creating new account"
                });
            }
            const account = {
                username: req.body.username,
                fullname: req.body.name,
                password: hash,
                email : req.body.email,
                usertype: req.body.role,
                created: Date.now()
            }
            db.accounts.create(account)
            .then(data =>{
                res.json({
                    status: 1,
                    data: data
                });
            })
            .catch(err =>{
                res.status(500).send({
                    status: 0,
                    message:
                    err.message || "Some errors occur while creating new account"
                });
            });
        });
    }
};