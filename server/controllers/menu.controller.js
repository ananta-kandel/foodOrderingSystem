const  mongoose = require("mongoose")
const menuModel = require("../model/menu.model")
const {handleUpload} = require("../utils/cloudnarySetup")

const createMenu = async (req, res) => {
  console.log('body: ', req.body);
  // console.log('files: ', req.file)
    try {
      const user = id;
      const existingMenu = await menuModel.findOne({ user });
  
      const { items } = req.body;
      const itemsArray = JSON.parse(items);
     console.log(itemsArray);
     
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cloudnaryResponse = await handleUpload(dataURI);
            const imageUrl =  cloudnaryResponse.url
  
      if (existingMenu) {
        // If menu exists, update existing items and add new items
        const updatedItems = itemsArray.map(item => ({ ...item, imageUrl }));
        existingMenu.items.push(...updatedItems);
        await existingMenu.save();
      } else {
        // If no menu exists, create a new one with the items and image
        const menu = new menuModel({ user, items: items.map(item => ({ ...item, imageUrl })) });
        await menu.save();
      }
  
      res.status(200).json({ message: "Menu Created Successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  };



const menuByuser = async(req,res) =>{
   try{
    const menu = await menuModel.find({user:id})
    if(!menu){
      res.status(201).json({
        message:"No any menu"
      })
    }
    else{
        res.send(menu)
    }
    
    console.log(menu)
   }
   catch(e){
     res.status(500).json({
        messsage:e,
     })
   }
}

const updateMenuItems = async(req,res) =>{
    try{
        console.log(req.params.id)
        const data = await menuModel.findOne({user:id})
        if(data){
            const item = data.items.find(items => items._id == req.params.id)
            console.log(item)
            if(item){
                item.name = req.body.name,
                item.price = req.body.price
            }
            await data.save()
        }
    }
    catch(e){
     res.status(500).json({
        message:e
     })
    }
    
}

const deleteMenuItems = async(req,res) =>{
    try{
        await menuModel.findByIdAndDelete({_id:req.body.id})
        res.status(200).json({
            message:"deleted sucessfully"
        })
    }
    catch(e){
        res.status(500).json({
            message:e
        })
    }
    
}

module.exports = {createMenu,menuByuser,updateMenuItems,deleteMenuItems}