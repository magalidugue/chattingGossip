const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pseudo: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}, 
    isOnline: {type: Boolean, default: false},
})

module.exports = mongoose.model('user', userSchema)
