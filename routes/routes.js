const router = require('express').Router()
const authController = require('../controllers/authController')

router.get('/', function(req, res) {
    res.json({
        status: 'API works',
        message: 'Welcome to my API'
    })
})

router.route('/register')
    .post(authController.register)
    
router.route('/login')
    .post(authController.login)

module.exports = router