const { verifyToken } = require('./TokenHandler')

function authenticate(req, res, next) {
    const token = req.headers.authorization
    // console.log(5,token);
    try {
        const respone = verifyToken(token)
        if (respone) {
            req.body.id = respone.id
            req.body.currentUser = respone.name
            next();
        }
        else {
            res.status(401).json({ message: 'token verification failed' })
            return;
        }
    } catch (err) {
        console.log("Authentication Error: ", err);
        res.status(401).json({ message: 'not a valid token' })
    }
}

module.exports = { authenticate }