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