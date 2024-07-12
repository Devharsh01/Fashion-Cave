let port = 4000
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log, error } = require("console");

const authController = require('./Controllers/authController')
const passController = require('./Controllers/passController')
const cartController = require('./Controllers/cartController')
const updateController = require('./Controllers/updateController')
const paymentController = require('./Controllers/paymentController')

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb://localhost:27017/FashionCave")

//Schema for products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true, 
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
    color: {
        type:String,
        default: "#000",
    },
    size: {
        type: Object,
        required: true,
    }
})

//For Adding Promo Details
const Promo = mongoose.model("Promo",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    off_price:{
        type: Number,
        required: true,
    },
    validity_till:{
        type: Date,
        required: true,
        default: Date.now,
    },
    validity_start:{
        type: Date,
        required: true,
        default: Date.now,
    }
})

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
            const data = jwt.verify(token,'ase240f-ds23/ds31-de-34t42-4vcb');
            req.user = data;
            next();
        }catch(error){
            res.status(401).send({"errors":"Please authenticate using a valid token"});
        }
    }
}

app.post('/addproduct', async (req, res) =>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else
        id = 1;
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    try{
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
    }catch(err){
        console.log("Error occured while saving");
    }
})

app.get('/allproducts', async (req, res)=>{
    let products = await Product.find({})
    res.send(products);
})

app.get('/product/:productId', async (req,res)=>{
    const {productId} = req.params;
    let prod = await Product.findOne({id: productId})
    if(!prod) {
        res.status(404).json({
            success: false,
            errors: "Product Not Found"
        })
    }
    else{
        res.status(200).send(prod)
    }
})

app.post('/addpromo', async (req,res)=>{
    let promos = await Promo.find({})
    let id = promos.length+1;
    const promo = new Promo({
        id: id,
        name: req.body.name,
        off_price: req.body.off_price,
        validity_till: req.body.validity_till,
        validity_start: req.body.validity_start,
    });
    console.log(promo);
    try{
        await promo.save();
        res.json({
            success:true,
            name: req.body.name,
        })
    }catch(err) {
        console.log("Error occured while saving promo");
        res.status(401).send()
    }
})

app.get('/allpromos', async (req, res)=>{
    let promos = await Promo.find({})
    res.send(promos);
})

app.post('/signup',authController.signup);
app.post('/login', authController.login);
app.post('/forgotPassword',passController.forgotPassword)
app.patch('/resetPassword/:token',passController.resetPassword)
app.patch('/updatePassword',passController.updatePassword)

//Creating Endpoint to get cartData
app.post('/addtocart',fetchUser, cartController.add)
app.post('/removefromcart',fetchUser, cartController.remove)
app.post('/getcart',fetchUser, cartController.gettingCart)

//Updating the Data
app.post('/update-address',fetchUser, updateController.address)
app.post('/orderSuccess',fetchUser, updateController.statusSuccess)
app.post('/orderFailed',fetchUser, updateController.statusFailed)

//Payment 
app.post('/paymentCard',fetchUser, paymentController.payCard)
app.post('/paymentCOD',fetchUser, paymentController.payCOD)

app.listen(port, (error)=>{
    if (!error) {
        console.log("Server is running at port "+port)
    }
})