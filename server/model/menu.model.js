const mongoose = require("mongoose");

const menuItemsSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     },
    name:{
        type:String
    },
    price:{
        type:Number
    }, 
})

const menuModel = mongoose.model('menuModel', menuItemsSchema);
module.exports = menuModel