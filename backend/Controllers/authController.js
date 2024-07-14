const Users = require("../Models/UserModel")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const signToken = (id,email) => {
    return jwt.sign({id: id, email: email}, process.env.jwt_token, {
        expiresIn: 300000000
    })
}

exports.signup = async (req,res,next) => {
    let check = await Users.findOne({email:req.body.email});            //Check if Same Email ID exists or not
    if(check){
        return res.status(400).json({
            success: false,
            errors:"Existing User found with same email address"
        })
    }
    let cart = {};                              //Cart for each user
    for(let i = 0;i<300;i++){
        cart[i] = 0;
    }
    try {
        let users = await Users.find({});
        let id;
        if(users.length>0){
            let last_product_array = users.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
        else
            id = 1;
        let user;
        user = new Users({
            id: id,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cart:cart,
        })
        await user.save();    
        let token;
        token = signToken(user.id, user.email);

        res.status(201).json({
            success: true,
            token,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: error
        })
    }
}

exports.login = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await Users.findOne({email: email}).select("+password");
        if(!user) {
            return res.status(400).json({
                success: false,
                errors: "User does not Exist"
            })
        }
        if(!(await user.comparePassword(password, user.password))) {
            return res.status(400).json({
                success: false,
                errors: "Password is Incorrect"
            })
        }
        const token = signToken(user.id, user.email);

        res.status(200).json({
            success: true,
            token: token 
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: "Some error occured"
        })
    }

}
