const db = require("../models");

require("dotenv").config();
exports.uploadImages = (req, res, next)=>{
    files = req.files
    if(files != null){
        data = []
        for (var i = 0; i < files.length; i++) {

            data.push(process.env.DB_HOST+":"+process.env.PORT + files[i].path.substring(2));
        }
        res.send({data})
    }
}

exports.getImagesByPostId = (req,res,next)=>{
    postid = req.params.pid;
    db.images.findAll({
        where:{postid:postid}
    }).then(data =>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Cannot get images for post "
        });
    });
}