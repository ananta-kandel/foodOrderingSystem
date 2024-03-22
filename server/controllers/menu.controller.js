const  mongoose = require("mongoose")
const menuModel = require("../model/menu.model")
const createMenu =(async(req,res) => {

try{
    let menuItem1 = new menuModel({ name: 'Pizza', price: 10 });
    menuItem1.save();   
}
catch(e){
    res.send("erroe")
} 
})

module.exports = {createMenu}