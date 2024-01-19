const jwt = require('jsonwebtoken')


function generateToken(user) {
    return jwt.sign({ id: user.id, currentUser: user.name }, process.env.SECRETKEY, { expiresIn: '30d' })
}

function verifyToken(token) {
    try {
        // console.log(10, token);
        if (!token) {
            throw new Error('!!Not a valid token!!');
        }
        else {
            const verifiedToken = jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
                if (err) {
                    throw new Error("!!Token doesn't matched!!")
                }
                return decoded
            })
            // console.log(16, verifiedToken);
            return verifiedToken;
        }
    } catch (error) {
        console.log("Token Verification Error: ", error);
        return false
    }
}

module.exports = { generateToken, verifyToken }