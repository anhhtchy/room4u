let jwtHelper = require("../../helpers/jwtHelper");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "room4u_access_secret";

exports.isOwner = async function (req, res, next) {
    const accessToken = req.body.accessToken || req.headers["x-access-token"];
    const userid = req.params.id || req.body.userid;
    if (accessToken) {
        try {
            const { data } = await jwtHelper.verifyToken(accessToken, accessTokenSecret);
            if( data.usertype !== null && data.usertype == 0 && data.userid == userid){
                req.data = data;
                next();
            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'You have not permission',
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: 0,
                message: error.message || 'Unauthorized',
            });
        }
    } else {
        return res.status(400).send({
            status: 0,
            message: 'No access token provided',
        });
    }
}