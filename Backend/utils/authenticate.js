const { verifyToken } = require('./TokenHandler')

function authenticate(req, res, next) {
    const token = req.headers.authorization
    // console.log(5,token);
    try {
        const response = verifyToken(token)
        if (response) {
            req.body.id = response.id
            req.body.currentUser = response.currentUser
            req.body.region = response.region
            next();
        }
        else {
            res.status(401).json({ error: 'token verification failed' })
            return;
        }
    } catch (err) {
        console.log("Authentication Error: ", err);
        res.status(401).json({ error: 'not a valid token' })
    }
}

module.exports = { authenticate }