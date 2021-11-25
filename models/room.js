const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {type: String, require: true},
    messages: {type: Array, default: []},
    number_connected: {type: Number, default: 0}
})

module.exports = mongoose.model('room', roomSchema)