const express = require('express');

const router = express.Router();

//Controller
const {
    login,
    signup
} = require('../controllers/users.controller')

//Middleware
const {
    createUserValidator,
    loginUserValidator
} = require('../middlewares/validations.middleware')

router
    .route('/signup')
    .post(createUserValidator, signup)

router
    .route('/login')
    .post(loginUserValidator, login)

module.exports = router;