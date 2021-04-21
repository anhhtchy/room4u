const db = require('../models');
let bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const { Op } = require("sequelize");

exports.createAccount = async (req, res) => {
    try {
        const [username, email] = await Promise.all([
            db.accounts.findOne({where: {username: req.body.username}}),
            db.accounts.findOne({where: {email: req.body.email}})
        ]);
        if(username !== null){
            return res.status(400).send({
                status: 0,
                message: "username already exists"
            });
        } else if (email !== null){
            return res.status(400).send({
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
                    return res.json({
                        status: 1,
                        data: data
                    })
                    console.log("account created");
                })
                .catch(err =>{
                    return res.status(500).send({
                        status: 0,
                        message:
                        err.message || "Some errors occur while creating new account"
                    });
                });
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message:
            error.message || "Some errors occur while creating new account"
        });
    }
};