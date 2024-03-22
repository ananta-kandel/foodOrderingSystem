const express = require("express")
const router = express.Router();
// const upload = require("../middlware/fileUpload")
const multerUploads = require('../middlware/fileUpload')
const {myRestaurant} = require("../controllers/myrestaurantController")
const {createMenu} = require("../controllers/menu.controller")
const authenticUser = require('../middlware/authenticUser')


router.post("/create" ,authenticUser, multerUploads ,myRestaurant)
router.post("/createmenu" ,authenticUser, createMenu)
module.exports = router;