const  mongoose = require("mongoose")
const menuModel = require("../model/menu.model")

const createMenu =async(req,res) => {
try{
        const user = id 
        const existingMenu = await menuModel.findOne({ user });
        console.log(req.body)
        const {items} = req.body
        console.log(items)
        if (existingMenu) {
            existingMenu.items.push(...items);
            await existingMenu.save();
        } else {
            // If no document exists, create a new one
            const menu = new menuModel({ user, items });
            await menu.save();
        }
        res.status(200).json({
            message: "Menu Created Sucessfully",
        });
}
catch(e){
    res.json({"erroe":"dd"})
} 
}

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