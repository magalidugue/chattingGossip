const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({id}, "CECIESTUNTOKEN", {
        expiresIn: 3600
    })
}


module.exports.register = async function(req, res) {
    const user = new User();
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.pseudo = req.body.pseudo;
    user.save(function(err) {
        if(err) {
            console.log(err);
            res.sendStatus(500)
            return
        }
        res.status(200).send({user : user})
    });
    
}

module.exports.login = async function(req, res) {
    const queryParam = {email : req.body.email}
    const user = await User.findOne(queryParam).exec();
    const token = createToken(user._id)
    if(!user) {
        res.status(404).send('unknown user')
        res.end()
        return
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send('incorrect password')
        res.end()
        return
    } 
    res.status(200).send({auth: true, user: user, token: token})
}
