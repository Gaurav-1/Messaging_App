const express = require('express')
const router = express.Router()
const {} = require('../utils/TokenHandler')
const {} = require('../controller/loginSignup')
const {} = require('../controller/chat')


router.route('/login')
.post()

router.route('/signup')
.post()

router.route('/topTrending')
.get()

router.route('/chat')
.get()
.post()