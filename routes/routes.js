const router = require('express').Router()
const authController = require('../controllers/authController')

router.get('/', function(req, res) {
    res.json({
        status: 'API works',
        message: 'Welcome to my API'
        
    })
})

router.get('/signup', function(req, res) {
    res.sendFile('/Users/amineamara/Desktop/chattingGossip/views/signupForm.html') 
})

router.get('/actionPage', function(req, res) {
    res.sendFile('//Users/amineamara/Desktop/chattingGossip/views/loginForm.html') 
})

router.get('/login', function(req, res) {
    res.sendFile('/Users/amineamara/Desktop/chattingGossip/views/loginForm.html') 
})


router.route('/register')
    .post(authController.register)
    
router.route('/login')
    .post(authController.login)

    

module.exports = router