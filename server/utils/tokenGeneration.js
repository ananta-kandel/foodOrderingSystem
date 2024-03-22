require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  console.log(data)
  return "Bearer " + jwt.sign( data , "ananta", {
    expiresIn: 3 * 24 * 60 * 60,
  });
}

module.exports =generateToken