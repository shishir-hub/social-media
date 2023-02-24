const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    let user = null;
    if (token) {
        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
        } catch (error) {
            res.status(401).send({
                error: error.message,
                msg: "Invalid Token"
            })
        }
    }
    if (user) {
        next();
    }
    else {
        return res.status(401).send({
            msg: "No User Found."
        })
    }
}

module.exports = {
    authenticate
}