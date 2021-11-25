const bcrypt = require('bcrypt')
const User = require("../models/user");

module.exports.getUser = async function(req, res) {
    const queryParam = {_id: req.params.id}
    const user = await User.findOne(queryParam).exec();
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
    await User.updateOne({_id: req.body.id}, req.body);
    const user = await User.findOne(queryParam)
    if (!checkIfUserExist(user, res)) {
        return
    }
    res.status(200).send({updated: true, user: user})
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
