const bcrypt = require('bcryptjs')
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.TOKEN_JWT

module.exports.fetchUser = async function(id) {
    return await User.findOne({_id: id}).exec();
}

module.exports.getUser = async function(req, res) {
    const user = this.fetchUser(req.params.id)
    if (!checkIfUserExist(user, res)) {
        return
    }
    res.status(200).send({user: user})
}

module.exports.addUser = async function(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const user = new User(req.body);
    user.save(function(err) {
        if(err) {
            console.log(err);
            res.sendStatus(500)
            return
        }
    });
}

module.exports.updateUser = async function(req, res) {
    const queryParam =  req.body
    if (queryParam.password) {
        queryParam.password = bcrypt.hashSync(queryParam.password, 8)
    }
    update(req.body.id, req.body)
    const user = await User.findOne(queryParam)
    if (!checkIfUserExist(user, res)) {
        return
    }
    res.status(200).send({updated: true, user: user})
}

async function update(id, params) {
    return await User.updateOne({_id: id}, params);
}

module.exports.deleteUser = async function(req, res) {
    await User.deleteOne({_id: req.body.id});
    const user = await User.findOne({_id: req.body.id})
    if(!user) {
        res.status(200).send('User successfully deleted')
        res.end()
        return
    }
    res.status(418).send("User " + user._id + " not deleted")
}

function checkIfUserExist(user, res) {
    if(!user) {
        res.status(404).send('unknown user')
        res.end()
        return false
    }
    return true
}

module.exports.getUserWithToken = async function(token) {
    const decoded = jwt.verify(token, SECRET_KEY)
    const user = await this.fetchUser(decoded['id'])
    return user
}

async function faisChier(token) {
    const decoded = jwt.verify(token, SECRET_KEY)
    const user = await faisChierSaMere(decoded['id'])
    return user
}

async function faisChierSaMere(id) {
    return await User.findOne({_id: id}).exec();
}

module.exports.changeNickname = async function(req, res) {
    const user = await faisChier(req.body.token);
    update(user.id, req.body.toChange)
}

