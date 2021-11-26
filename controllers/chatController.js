const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.TOKEN_JWT
const userController = require('./userController')
const {fetchUser} = require("./userController");

module.exports.socketResponder = function(socket, io) {
    socket.on('create', function(room) {
        socket.join(room);
    });

    socket.on('leave', function(room) {
        socket.leave(room);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat', message => {
        console.log('From client: ', message)
        getUserWithToken(message['token']).then(value =>
            {
                io.to(message['room']).emit('chat', value.pseudo + ': ' + message['message'])
            }
        )
    })
}

async function getUserWithToken(token) {
    let decoded = jwt.verify(token, SECRET_KEY)
    return await fetchUser(decoded['id'])
}

