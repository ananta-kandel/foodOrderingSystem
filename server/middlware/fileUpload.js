// const multer = require('multer');

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// Create the multer instance
// const upload = multer({ storage: storage });

const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({storage });

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('file');


module.exports = multerUploads;