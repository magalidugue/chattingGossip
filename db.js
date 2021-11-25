const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chattingGossip').then(console.log('connected to mongodb'))
    .catch(error => console.log(error))
