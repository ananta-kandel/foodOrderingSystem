const mongoose = require("mongoose");
const menuItemSchema = new mongoose.Schema({
    name:
    {
        type:String
    },
    price:{
        type:String
    },
    description:{
        type:String
    },
    imageUrl  :{
        type:String,
    },
})
const menuItemsSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     },
    items: [menuItemSchema]
})

const menuModel = mongoose.model('menuModel', menuItemsSchema);
module.exports = menuModel