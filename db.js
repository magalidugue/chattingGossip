const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chattingGossip')
    .catch(error => console.log(error))
