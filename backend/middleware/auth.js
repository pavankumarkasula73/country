const jwt = require('jsonwebtoken');

function auth(role) {
    return (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (role && user.role !== role) {
            return res.status(403).send('Forbidden');
        }
        req.user = user;
        next();
    };
}

module.exports = auth;
