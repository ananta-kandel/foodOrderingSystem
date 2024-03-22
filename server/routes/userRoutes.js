const express = require('express')
const router = express.Router()
const {register,login,fetchUser} = require("../controllers/userController")
const authenticUser = require('../middlware/authenticUser')
router.post('/register', register)
router.post('/login',login)
router.get('/fetchuser',authenticUser, fetchUser)
module.exports = router;