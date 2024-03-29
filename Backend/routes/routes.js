const express = require('express')
const router = express.Router()
const { authenticate } = require('../utils/authenticate')
const { loginUser, signupUser, verifyMail, jwtLogin } = require('../controller/loginSignup')
const { createGroup, searchUser, myGroups } = require('../controller/group')
const { insertChat, loadChat } = require('../controller/chat')
const { TopActives } = require('../controller/topActives')


// router.get('/', (req, res) => {
//     res.send("hello")
// })

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

router.route('/message')
    .all(authenticate)
    .post(insertChat)

router.route('/loadmessages')
    .all(authenticate)
    .post(loadChat)

router.route('/verify/:id')
    .get(verifyMail)

router.route('/topactives')
    .all(authenticate)
    .get(TopActives)


router.route('*', (req, res) => res.status(401).send('Bad Request'))


module.exports = router