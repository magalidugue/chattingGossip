const router = require('express').Router()
const authController = require('../controllers/authController')
const security = require('../middlewares/security')
const userController = require('../controllers/userController')
const { get } = require('mongoose')
const path = require("path");
const chatController = require ('../controllers/chatController.js')

router.get('/', function(req, res) {
    res.json({
        status: 'API works',
        message: 'Welcome to my API'
        
    })
})

router.get('/signup', function(req, res) {
    res.sendFile('signupForm.html',{ root: path.join(__dirname, '../views') })
})


router.route('/register')
    .post(authController.register)
    
router.route('/login')
    .post(authController.login)
    .get( function(req, res) {
        res.sendFile('loginForm.html', { root: path.join(__dirname, '../views') })
    })

router.route('/user')
    .get(security.checkAdmin, userController.getUser)
    .post(security.checkAdmin, userController.addUser)
    .put(security.checkAdmin, userController.updateUser)
    .delete(security.checkAdmin, userController.deleteUser)

router.route('/chat')
    .get(security.isAuthentificated, function(req, res) {
        res.sendFile('mainChatPage.html', { root: path.join(__dirname, '../views') })
    })

router.route('/changeNickname')
    .put(security.isAuthentificated, userController.changeNickname)



module.exports = router