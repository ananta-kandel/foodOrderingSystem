const  mongoose = require("mongoose")
const resturantModel = require("../model/restaurantModel")
const {handleUpload} = require("../utils/cloudnarySetup")
const menuModel = require("../model/menu.model")
const myRestaurant = async(req,res) =>{
    try{
        const user = new mongoose.Types.ObjectId(id)
        console.log(req.body)
        const {restaurantName,city,deliveryPrice, estimatedDeliveryTime,cuisines,description} = req.body
        const existingResturant = await resturantModel.findOne({restaurantName})
        const resturantByUser = await resturantModel.find({user:id} )
        if(existingResturant){
            res.status(401).json({"message" : "Resturant or Resturant already exits"})
        }
        else{
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cloudnaryResponse = await handleUpload(dataURI);
            const imageUrl =  cloudnaryResponse.url
           const newResturant = new resturantModel({user,restaurantName,city,deliveryPrice, estimatedDeliveryTime,cuisines,imageUrl,description})
           await newResturant.save()
           res.status(200).json({
               message: "Resturant created sucessfully",
          }) 
        }
         
    }
    catch(e){
        // console.log('123')
        console.log(e)
        res.status(500).json({
            message:"error"
        })
    }
}

const addMenu =async(req,res)=>{
     try{
        const menu = await menuModel.findOne({user:id})
        const restaurant = await resturantModel.findOne({user:id})
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        if (menu) {
            restaurant.menuItems = menu._id // Assuming menuItems is an array of menu items
            await restaurant.save();
        }
        res.status(200).json({
            message:"menu added sucessfully"
        })
     }
     catch(e){
        res.status(500).json({
            message:"canot add menu"
        })
     }
}
const getOneRestaurantUserSide = async (req, res) => {
    try {
        console.log(11,req.params)
        const { id } = req.params; // Assuming the restaurant ID is passed as a route parameter
        const restaurant = await resturantModel.find({ _id: id }); // Assuming your model has an _id field
        
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // If restaurant is found, send it in the response
        res.status(200).json({ restaurant });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOneRestaurant = async(req,res) =>{
    try{
        const restaurant = await resturantModel.find({user:id})
        if(!restaurant){
            res.status(201).json({
                message:"No any Restaurant"
            })
        }
        else{
            res.send(restaurant)
        }
        
    }
    catch(e){
        res.status(500).json({
            message:"Canot Get Restaurant"
        })
    }
}
const getallrestaurant = async (req, res) => {
    try {
        const data = await resturantModel.find({}).populate('menuItems');
        res.send(data);
    } catch (e) {
        res.status(400).json({
            message: e
        });
    }
};


module.exports = {myRestaurant,getallrestaurant,addMenu,getOneRestaurantUserSide,getOneRestaurant}