const db = require('../models');
let bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

exports.createAccount = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if(err){
            return res.status(500).send({
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
            res.json(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                err.message || "Some errors occur while creating new account"
            });
        });
    });
};