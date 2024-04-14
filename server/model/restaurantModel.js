const mongoose = require("mongoose");
const user = require("./user");
const menuModel = require("./menu.model")
const menuItemsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
     
})
const restaurantSchema = new mongoose.Schema({
    user : {
       type:mongoose.Schema.Types.ObjectId,
       ref:"user"
    },
    restaurantName: {
        type:String,
        required:true
    },
    city:{
        type:String
    },
    deliveryPrice:{
        type:Number
    },
    estimatedDeliveryTime:{
        type:Number
    },
    cuisines : [],
    // menuItems :[menuItemsSchema],
    menuItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuModel' // Replace 'menuModel' with the actual name of your Mongoose model
    },
    imageUrl  :{
        type:String,
    },
    description :{
        required:true,
        type:String
    }

})

const myRestaurant = mongoose.model('myRestaurant', restaurantSchema);
module.exports = myRestaurant