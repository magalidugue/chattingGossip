const router = require('express').Router()
const authController = require('../controllers/authController')
const security = require('../middlewares/security')
const userController = require('../controllers/userController')

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

router.route('/user')
    .get(userController.getUser)
    .post(userController.addUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router