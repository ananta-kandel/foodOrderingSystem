const userModel = require("../model/user");
const generateToken = require("../utils/tokenGeneration");
const nodemailer = require('nodemailer');
const multer = require("multer")


const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const checkUserName = await userModel.findOne({ username });
        if (checkUserName) {
            return res.send("User already exists");
        }
        //otp registration
        // const otp = Math.random().toString().slice(2, 8);
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//             auth: {
//                 user: 'kandelananta5@gmail.com',
//                 pass: '9860E402XXA@'
//             }
//         });
//         const mailOptions = {
//             from: 'your_email@gmail.com',
//             to: email,
//             subject: 'OTP for Registration',
//             text: `Your OTP for registration is: ${otp}`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 res.status(500).send('Error sending email');
//             } else {
//                 console.log('Email sent:', info.response);
//                 res.status(200).send('OTP sent to your email');
//             }
//         });
        
        const newUser = await new userModel({ username, email, password });
        await newUser.save();
        const data ={
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
    console.log(user);
    const data = {
        id: user._id
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
