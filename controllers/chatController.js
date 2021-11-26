const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.TOKEN_JWT
const userController = require('./userController')
const {fetchUser} = require("./userController");

module.exports.socketResponder = function(socket, io) {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat', msg => {
        console.log('message: ' + msg);
    });
    socket.on('chat', message => {
        console.log('From client: ', message)
        getUserWithToken(message['token']).then(value =>
            {
                io.emit('chat', value.pseudo + ': ' + message['message'])
            }
        )
    })
}

async function getUserWithToken(token) {
    let decoded = jwt.verify(token, SECRET_KEY)
    return await fetchUser(decoded['id'])
}

