const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.TOKEN_JWT
const User = require('../models/user');
const {getUserWithToken} = require("../controllers/userController");

exports.checkAdmin = async (req, res, next) => {
    let token = req.cookies['token']
    const user = await getUserWithToken(token)
    if (user) {
        if (user.isAdmin) {
            next()
        } else {
            return res.status(401).json("no authorize")
        }
    }
}

function parseToken(token) {
    console.log(token)
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    return token
}

exports.isAuthentificated = async (req, res, next) => {
    const token = parseToken(req.cookies['token'])
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            }
            next()
        });
    } else {
        return res.status(401).json('token_required');
    }
}