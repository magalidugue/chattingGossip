const router = require('express').Router()
const authController = require('../controllers/authController')

router.get('/', function(req, res) {
    res.json({
        status: 'API works',
        message: 'Welcome to my API'
    })
})

module.exports = router