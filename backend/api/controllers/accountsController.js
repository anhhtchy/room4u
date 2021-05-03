const db = require('../models');
let bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const { Op } = require("sequelize");
let jwtHelper = require("../../helpers/jwtHelper");

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "900";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "ROOM4U";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3h";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "ROOM4U";

tokenList = {};

exports.getAccount = async (req, res) => {
    try {
        const user = await db.accounts.findOne({where: {userid: req.params.userid}});
        if(user == null){
            return res.status(400).send({
                status: 0,
                message: "user does not exist"
            });
        } else {
            user.password = null;
            return res.json({
                status: 1,
                user: user
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message: error.message || "Some errors occur while finding account"
        });
    }
};

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
                    usertype: req.body.roles,
                    created: Date.now()
                }
                db.accounts.create(account)
                .then(data =>{
                    data.password = null;
                    return res.json({
                        status: 1,
                        data: data
                    });
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
            message: error.message || "Some errors occur while creating new account"
        });
    }
};

exports.login = async (req, res) => {
    try {
        let user = await db.accounts.findOne({
            where: {
                username: req.body.username
            }
        });

        if (user == null) {
            return res.status(400).send({
                status: 0,
                message: "username incorrect"
            });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(400).send({
                status: 0,
                message: "password incorrect",
            });
        }

        user.password = undefined;

        let userData = user;

        const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);

        const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);

        tokenList[refreshToken] = {
            userData
        };

        return res.json({
            status: 1,
            accessToken: accessToken,
            refreshToken: refreshToken,
            userData: userData
        });
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message:
                error.message || "Some errors occur while login"
        });
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (refreshToken && tokenList[refreshToken]) {
        try {
            const userData = await jwtHelper.verifyToken(
                refreshToken,
                refreshTokenSecret
            );

            const accessToken = await jwtHelper.generateToken(
                userData,
                accessTokenSecret,
                accessTokenLife
            );
            return res.json({
                status: 1,
                accessToken: accessToken,
            });
        } catch (error) {
            return res.status(400).send({
                status: 0,
                message:
                    error.message || "Some errors occur while refresh token"
            });
        }
    } else {
        return res.status(400).send({
            status: 0,
            message: "refreshToken invalid"
        });
    }
};