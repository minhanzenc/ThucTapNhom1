const jwt = require('jsonwebtoken')

function signToken(user) {
    return jwt.sign(
        {id: user._id, name: user.name, role: user.role} ,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.EXPRIRE_IN_TOKEN,
        }
    )
}

module.exports = { signToken }