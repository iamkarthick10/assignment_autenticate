const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.header.authorization.split(' ')[1];
        if(!token) throw new Error("Auth Failed")

        const decoded = jwt.verify(token,'shhhh');
        req.userData = {email : decoded.user};
        next();
    }
    catch(err) {
        const error =new Error("Auth failed in Catch")
        return next(error);
    }

}