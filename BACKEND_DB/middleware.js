const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) {
    const token = req.headers.token;
    const decode = jwt.verify(token, "secretkey");
    if(decode.userId){
        req.userId = decode.userId;
        next();
    }
    else{
        res.status(401).json({message: "Unauthorized"});
    }
}
module.exports = {

    authMiddleware: authMiddleware
}