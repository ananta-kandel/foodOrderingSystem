const express = require("express")
const router = express.Router();
// const upload = require("../middlware/fileUpload")
const multerUploads = require('../middlware/fileUpload')
const {myRestaurant, getallrestaurant,getOneRestaurantUserSide,addMenu, getOneRestaurant} = require("../controllers/myrestaurantController")
const {createMenu, menuByuser, updateMenuItems, deleteMenuItems} = require("../controllers/menu.controller")
const authenticUser = require('../middlware/authenticUser')


router.post("/create" ,authenticUser('ADMIN'), multerUploads ,myRestaurant)
router.get("/getallrestaurant" ,getallrestaurant)
router.get("/getonerestaurant",authenticUser('ADMIN'),getOneRestaurant)
router.get("/addmenus",authenticUser('ADMIN'),getOneRestaurant)
router.post("/addmenu",authenticUser('ADMIN'),addMenu)

//user
router.get("/getonerestaurant/:id",authenticUser('USER'),getOneRestaurantUserSide)

//routes for menu
router.post("/createmenu" ,authenticUser('ADMIN'), createMenu)
router.put("/updatemenuitems/:id",authenticUser('ADMIN'),updateMenuItems)
router.delete("/deletemenuitems",authenticUser,deleteMenuItems)
router.get("/getmenu" ,authenticUser('ADMIN'), menuByuser)
module.exports = router;