const express = require("express")
const app = express();
var cors = require('cors')
require('dotenv').config()

app.use(cors({
    origin:"*"
}))
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3001;

//database connection
// curly bracket is used to import and export the function whhich is  destucting
const { dbconnection } = require("./db/DbConnection.js")
dbconnection();

// Routes 
const userRoute = require("./routes/userRoutes.js")
const myRestaurantRoute = require("./routes/myRestaurantRoute.js")
app.use("/api/user", userRoute)
app.use("/api/restaurant", myRestaurantRoute)

//test
// const multerUploads = require("./middlware/fileUpload.js")
// app.post('/upload', multerUploads, (req, res) => {
//     console.log('req.body :', req.file);
//     });

app.listen(port , ()=>{
    console.log(`server is listening on port ${port}`)
})