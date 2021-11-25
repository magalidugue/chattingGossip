// require('dotenv').config()
require('./db')
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4040 // to modify later with process.env
const app = express()
const router = require('./routes/routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, function() {
    console.log("Running on port " + port)
})

const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use('/', router)