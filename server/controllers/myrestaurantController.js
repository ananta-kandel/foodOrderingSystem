const  mongoose = require("mongoose")
const resturantModel = require("../model/restaurantModel")
const {handleUpload} = require("../utils/cloudnarySetup")
const myRestaurant = async(req,res) =>{
    try{
        const user = new mongoose.Types.ObjectId(id)
        console.log(req.body)
        const {restaurantName,city,deliveryPrice, estimatedDeliveryTime,cuisines,menuItems} = req.body
        const existingResturant = await resturantModel.findOne({restaurantName} )
        // const resturantByUser = await resturantModel.find({user:id} )
    
        if( existingResturant ){
            res.status(200).json({"message" : "Resturant or Resturant already exits"})
        }
        else{
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cloudnaryResponse = await handleUpload(dataURI);
            const imageUrl =  cloudnaryResponse.url
            console.log(imageUrl)
           const newResturant = new resturantModel({user,restaurantName,city,deliveryPrice, estimatedDeliveryTime,cuisines,menuItems,imageUrl})
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

const fetchMenu = async(req , res)=>{
    const user = await resturantModel.findOne({user : id})
    const menuItems = user.menuItems
    res.json({
       menuItems
    })
}
const updateMenu = async (req, res) => {
    try {
        const user = await resturantModel.findOne({ user: id });
        const length = user.menuItems.length
        user.menuItems.forEach(async(element) => {
           await resturantModel.findOne()
           console.log(element._id)
        });

        res.status(200).json({ message: 'Menu items updated successfully' });
    } catch (error) {
        console.error('Error updating menu items:', error);
        res.status(500).json({ message: 'Error updating menu items' });
    }
};


module.exports = {myRestaurant ,fetchMenu,updateMenu}