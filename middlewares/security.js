const jwt = require('jsonwebtoken');
// const SECRET_KEY = "CECIESTUNTOKEN";
const User = require('../models/user');


exports.checkAdmin = async (req, res, next) => {
    const user = await User.findOne({mail: req.body.mail}).exec();
    console.log(user)
    if (user) {
        if (user.isAdmin) {
            next()
        } else {
            return res.status(401).json("no authorize")
        }
    }
    console.log( "test")
}