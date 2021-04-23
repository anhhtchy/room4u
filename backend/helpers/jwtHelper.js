let jwt = require("jsonwebtoken");

exports.generateToken = function (user, secretSignature, tokenLife) {
    return new Promise((resolve, reject) => {
        const userData = user;

        jwt.sign(
            {
                data: userData,
            },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            }
        );
    });
};

exports.verifyToken = function (token, secretKey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};