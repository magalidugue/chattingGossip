const userController = require('./userController')

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
        userController.getUserWithToken(message['token']).then(value =>
            {
                io.to(message['room']).emit('chat', value.pseudo + ': ' + message['message'])
            }
        )
    })
}

