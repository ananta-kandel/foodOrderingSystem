const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({ 
    username: {
        unique:true,
        type: String
    },
    email: {
        unique:true,
        type:String
    },
    password: {
        type:String
    },
    role: {
        type: String,
        enum : ['USER','ADMIN','SUPERADMIN'],
        default: 'USER'
    },
    
});
const user = mongoose.model('user', userSchema);
module.exports = user;