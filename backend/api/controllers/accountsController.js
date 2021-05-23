const db = require('../models');
let bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const { Op } = require("sequelize");
let jwtHelper = require("../../helpers/jwtHelper");
let nodemailer = require('nodemailer');

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "0.5h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "room4u_access_secret";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3h";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "room4u_refresh_secret";
const emailService = process.env.EMAIL_SERVICE || "gmail";
const emailUser = process.env.EMAIL_USER || "team5rsit4613@gmail.com";
const emailPassword = process.env.EMAIL_PASSWORD || "btl123456";
const otpTokenLife = process.env.OTP_TOKEN_LIFE || "3m"
const otpTokenSecret = process.env.OTP_TOKEN_SECRET || "room4u_otp_secret"
let tokenList = {};

exports.forgetPassword = async (req, res) => {
    const otpToken = req.body.otpToken
    if (otpToken) {
        try {
            const { data } = await jwtHelper.verifyToken(otpToken, otpTokenSecret);
            bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {
                if (err) {
                    return res.status(500).send({
                        status: 0,
                        message:
                            err.message || "Some errors occur while changing password"
                    });
                }
                db.accounts.update({
                    password: hash,
                }, {
                    where: { username: data.username },
                    returning: true,
                    plain: true
                })
                .then(function () {
                    return res.json({
                        status: 1,
                    });
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 0,
                message: error.message || 'Some errors occur while changing password',
            });
        }
    } else {
        return res.status(400).send({
            status: 0,
            message: 'No otp token provided',
        });
    }
}

exports.sendOtp = async (req, res) => {
    const option = {
        service: emailService,
        auth: {
            user: emailUser,
            pass: emailPassword
        }
    };
    let transporter = nodemailer.createTransport(option);
    try {
        const user = await db.accounts.findOne({
            where: {
                [Op.or]: [
                    { username: req.body.username },
                    { email: req.body.email }
                ]
            }
        });
        if (user == null) {
            return res.status(400).send({
                status: 0,
                message: "user does not exist"
            });
        } else {
            transporter.verify(function(error, success) {
                if (error) {
                    return res.status(500).send({
                        status: 0,
                        message: error.message || "Some errors occur while sending email"
                    });
                } else {
                    let otp = Math.floor(100000 + Math.random() * 900000);
                    let mail = {
                        from: emailUser,
                        to: user.email, 
                        subject: 'Xác thực tài khoản Room4U',
                        text: 'Mã xác thực của bạn là ' + otp + '. Mã này có hiệu lực trong vòng 3 phút',
                    };
                    transporter.sendMail(mail, async function(error, info) {
                        if (error) {
                            return res.status(500).send({
                                status: 0,
                                message: error.message || "Some errors occur while sending email"
                            });
                        } else {
                            user.password = undefined;
                            let userData = user;
                            let otpToken = await jwtHelper.generateToken(userData, otpTokenSecret, otpTokenLife);
                            return res.json({
                                status: 1,
                                otp: otp,
                                otpToken: otpToken
                            });
                        }
                    });
                }
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message: error.message || "Some errors occur while sending email"
        });
    }
}

exports.getAccount = async (req, res) => {
    try {
        const user = await db.accounts.findOne({ where: { userid: req.params.userid } });
        if (user == null) {
            return res.status(400).send({
                status: 0,
                message: "user does not exist"
            });
        } else {
            user.password = null;
            return res.json({
                status: 1,
                userData: user
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
            db.accounts.findOne({ where: { username: req.body.username } }),
            db.accounts.findOne({ where: { email: req.body.email } })
        ]);
        if (username !== null) {
            return res.status(400).send({
                status: 0,
                message: "username already exists"
            });
        } else if (email !== null) {
            return res.status(400).send({
                status: 0,
                message: "email already exists"
            });
        } else {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err) {
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
                    email: req.body.email,
                    usertype: req.body.roles,
                    avatar: req.body.images[0],
                    address: req.body.address,
                    phone: req.body.phone,
                    created: Date.now()
                }
                db.accounts.create(account)
                    .then(data => {
                        data.password = null;
                        return res.json({
                            status: 1,
                            data: data
                        });
                        console.log("account created");
                    })
                    .catch(err => {
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
            const { data } = await jwtHelper.verifyToken(
                refreshToken,
                refreshTokenSecret
            );

            const accessToken = await jwtHelper.generateToken(
                data,
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

exports.logout = async function (req, res) {
    const { refreshToken } = req.body;
    if (refreshToken && (tokenList[refreshToken])) {
        try {
            delete tokenList[refreshToken];
            return res.json({
                status: 1,
            });
        } catch (error) {
            return res.status(500).send({
                status: 0,
                message:
                    error.message || "Some errors occur while logout"
            });
        }
    } else if (refreshToken) {
        console.log(refreshToken);
        console.log(tokenList);
        return res.status(400).send({
            status: 0,
            message: 'Invalid refreshToken',
        });
    } else {
        return res.status(400).send({
            status: 0,
            message: 'No refreshToken provided',
        });
    }
}

exports.changePassword = async (req, res) => {
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

        bcrypt.hash(req.body.newPassword, saltRounds, function (err, hash) {
            if (err) {
                return res.status(500).send({
                    status: 0,
                    message:
                        err.message || "Some errors occur while changing password"
                });
            }
            db.accounts.update({
                password: hash,
            }, {
                where: { username: req.body.username },
                returning: true,
                plain: true
            })
                .then(function () {
                    return res.json({
                        status: 1,
                    });
                });
        });
    } catch (error) {
        return res.status(500).send({
            status: 0,
            message:
                error.message || "Some errors occur while changing password"
        });
    }
}
exports.updateProfile = (req, res, next) => {
    db.accounts.update({
        fullname: req.body.fullname,
        email: req.body.email,
        avatar: req.body.images[0],
        address: req.body.address,
        phone: req.body.phone
    }, { where: { userid: req.params.id } })
        .then(data => {
            return res.status(200).send({
                status: 1
            });
        })
        .catch(err => {
            return res.send({
                message: err.message || "Cannot update account"
            })
        })
}