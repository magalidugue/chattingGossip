const User = require('../models/user')
const userController = require('../controllers/userController')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.TOKEN_JWT


const createToken = (id) => {
    return jwt.sign({id}, SECRET_KEY, {
        expiresIn: '1h'
    })
}


module.exports.register = async function(req, res) {
    await userController.addUser(req, res)
    res.redirect('/login')
}

module.exports.login = async function(req, res) {
    const queryParam = {email : req.body.email}
    const user = await User.findOne(queryParam).exec();
    if(!user) {
        res.status(404).send('unknown user')
        res.end()
        return
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send('incorrect password')
        res.end()
        return
    }
    const token = createToken(user._id)
    res.cookie('token', token, {
        maxAge: 3600000
    })
    res.redirect('/chat')
}
