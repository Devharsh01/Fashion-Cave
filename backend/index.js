let port = 4000 || process.env.PORT;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log, error } = require("console");
require('dotenv').config();

const authController = require('./Controllers/authController')
const passController = require('./Controllers/passController')
const cartController = require('./Controllers/cartController')
const updateController = require('./Controllers/updateController')
const paymentController = require('./Controllers/paymentController')
const productController = require('./Controllers/productController')
const promoController = require('./Controllers/promoController')
const userController = require('./Controllers/userController')

app.use(express.json());

// Database Connection with MongoDB
mongoose.connect(`mongodb+srv://${process.env.mongoDBUser}:${process.env.mongoDBPass}@fashioncave.d1rhbrw.mongodb.net/FashionCave`).then(()=>console.log("DB Connected"))

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

//Creating Upload Endpoint for image
app.use('/images',express.static('upload/images')) 
app.post('/upload', upload.single('product'),(req,res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const fetchUser = async (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token, process.env.jwt_token);
            req.user = data;
            next();
        }catch(error){
            res.status(401).send({"errors":"Please authenticate using a valid token"});
        }
    }
}

//Product Information
app.post('/addproduct', productController.addProduct)
app.get('/allproducts', productController.allProducts)
app.get('/product/:productId', productController.product)

//Promo Code Details
app.post('/addpromo', promoController.addPromo)
app.get('/allpromos', promoController.allPromos)

//Authentication
app.post('/signup',authController.signup);
app.post('/login', authController.login);
app.post('/forgotPassword',passController.forgotPassword)
app.patch('/resetPassword/:token',passController.resetPassword)
app.patch('/updatePassword',passController.updatePassword)

//Creating Endpoint to get cartData
app.post('/addtocart',fetchUser, cartController.add)
app.post('/removefromcart',fetchUser, cartController.remove)
app.post('/getcart',fetchUser, cartController.gettingCart)

//Updating the Order Data
app.post('/update-address',fetchUser, updateController.address)
app.post('/orderSuccess',fetchUser, updateController.statusSuccess)
app.post('/orderFailed',fetchUser, updateController.statusFailed)

//Payment 
app.post('/paymentCard',fetchUser, paymentController.payCard)
app.post('/paymentCOD',fetchUser, paymentController.payCOD)

//User Details
app.get('/allusers', userController.allUsers)

app.listen(port, (error)=>{
    if (!error) {
        console.log("Server is running at port "+port)
    }
})