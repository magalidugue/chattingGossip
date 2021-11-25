const router = require('express').Router()
const authController = require('../controllers/authController')
const security = require('../middlewares/security')
const userController = require('../controllers/userController')
const { get } = require('mongoose')

router.get('/', function(req, res) {
    res.json({
        status: 'API works',
        message: 'Welcome to my API'
        
    })
})

router.get('/signup', function(req, res) {
    res.sendFile('/Users/amineamara/Desktop/chattingGossip/views/signupForm.html') 
})

router.route('/register')
    .post(authController.register)
    
router.route('/login')
    .post(authController.login)
    .get( function(req, res) {
        res.sendFile('/Users/amineamara/Desktop/chattingGossip/views/loginForm.html') 
    })

router.route('/user')
    .get(userController.getUser)
    .post(userController.addUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router