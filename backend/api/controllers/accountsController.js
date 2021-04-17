const db = require('../models');

exports.createAccount = (req, res) => {
    
    const account = {
        username: req.body.username,
        fullname: req.body.name,
        password: req.body.password,
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
};