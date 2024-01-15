const jwt = require('jsonwebtoken')


function generateToken(user) {
    return jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.SECRETKEY);
}

function verifyToken(token) {
    try {
        if (!token) return null;
        const verifiedToken = jwt.verify(token, process.env.SECRETKEY)
        return verifiedToken;
    } catch (error) {
        console.log("Token Verification Error: ", error);
        return null
    }
}

module.exports = { generateToken, verifyToken }