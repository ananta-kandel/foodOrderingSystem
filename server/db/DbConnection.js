const mongoose = require("mongoose");
const dbconnection = (req,res)=>{
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/foodorderingsystem')
        console.log("databasee connected")
    }
    catch(e){
        res.json({
            message:"canot connect to database"
        })
    }
}

module.exports = { dbconnection };
