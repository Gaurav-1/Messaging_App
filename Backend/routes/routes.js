const express = require('express')
const router = express.Router()
const { authenticate } = require('../utils/authenticate')
const { loginUser, signupUser, verifyMail, jwtLogin } = require('../controller/loginSignup')
const { createGroup, searchUser, myGroups } = require('../controller/group')


router.get('/', (req, res) => {
    res.send("hello")
})

router.route('/login')
    .post(loginUser)

router.route('/signup')
    .post(signupUser)

router.route('/jwtlogin')
    .all(authenticate)
    .get(jwtLogin)

router.route('/mygroups')
.all(authenticate)
.get(myGroups)

router.route('/creategroup')
    .all(authenticate)
    .post(createGroup)

router.route('/searchuser')
    .all(authenticate)
    .get(searchUser)

// router.route('/msg')
//     .all(authenticate)
//     .post()

// router.route('/verify')
//     .post(verifyMail)


module.exports = router