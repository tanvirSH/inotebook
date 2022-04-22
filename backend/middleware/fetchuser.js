const jwt = require('jsonwebtoken');
const JWT_SECRET = 'YusufIsGood$Boy';

const fetchuser = (req, res, next) => {
    //Get user from jwt token and add id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate wih valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate wih valid token" });
    }
    

};

module.exports = fetchuser;