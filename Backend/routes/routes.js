const express = require('express')
const router = express.Router()
const { verifyToken } = require('../utils/TokenHandler')
const { loginUser, signupUser, verifyMail } = require('../controller/loginSignup')
const { } = require('../controller/chat')


router.route('/login')
    .post(loginUser)

router.route('/signup')
    .post(signupUser)

router.route('/topTrending')
    .get()

router.route('/verify')
    .post(verifyMail)
