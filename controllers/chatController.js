const User = require('../models/user')
const userController = require('../controllers/userController')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.TOKEN_JWT


