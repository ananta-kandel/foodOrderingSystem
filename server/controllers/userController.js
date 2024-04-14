const userModel = require("../model/user");
const generateToken = require("../utils/tokenGeneration");

const register = async (req, res) => {
    const { username, email, password ,role } = req.body;
    try {
        const checkUserName = await userModel.findOne({ username });
        if (checkUserName) {
            // return res.status("401").({"message" : "User already exists"});
            return res.status(401).send("user Already Exists")
        }
        const newUser = new userModel({ username, email, password ,role});
        await newUser.save();
        const data ={
            role : newUser.role,
            id : newUser._id
        }
        const access_token = generateToken(data);
        res.status(200).json({
            message: "Login Successful",
            access_token,
       }) 
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error registering user");
    }
};
const login = async(req,res) =>{
    try{
    const {username , password} = req.body;
    const user = await userModel.findOne({ username , password})
    console.log(user.role)
    const data = {
        id: user._id,
        role:user.role
    }
    const access_token = generateToken(data);
    if(user){
        res.status(200).json({
            message:"login sucessfully",
            access_token,
        })
    }
}
catch(e){
    res.send(e)
}
}

const fetchUser = async(req , res)=>{
    const user = await userModel.findOne({ _id: id})
    res.json({
    user
    })
}
module.exports = { register,login,fetchUser };
