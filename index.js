// require('dotenv').config()
require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const port = 4040 // to modify later with process.env
const app = express()
const router = require('./routes/routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, function() {
    console.log("Running on port " + port)
})

app.use('/', router)