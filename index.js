require('dotenv').config()
require('./db')
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4040 // to modify later with process.env
const app = express()
const router = require('./routes/routes')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cookieParser = require("cookie-parser");
const chatController = require('./controllers/chatController')

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

server.listen(port, function() {
    console.log("Running on port " + port)
})

io.on('connection', (socket) => {
    chatController.socketResponder(socket, io)
});


app.use('/', router)