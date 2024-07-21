const Users = require('../Models/UserModel')

exports.remove = async (req,res)=>{
    let userData = await Users.findOne({id:req.user.id});
    if(!userData) {
        return res.status(400).json({
            success: false,
            errors: "Token is invalid or has expired!"
        })
    }
    try {
        if (!userData.cart[req.body.itemId]) return;
        const index = userData.cart[req.body.itemId].indexOf(req.body.size);
        if (index > -1) {
            userData.cart[req.body.itemId].splice(index, 1);        //Remove the element at index and 1 represents count
        }
        if (userData.cart[req.body.itemId].length === 0) {
            delete userData.cart[req.body.itemId];
        }
        const userTemp = await Users.findOneAndUpdate({id:req.user.id},{cart:userData.cart});
        if(!userTemp) {
            return res.status(400).json({
                success: false,
                errors: "Token is invalid or has expired!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Removed"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: "Error Occuring while Updating"
        })
    }
}

exports.add = async (req,res)=>{
    let userData = await Users.findOne({id:req.user.id});
    if(!userData) {
        console.log("User not found")
        return res.status(400).json({
            success: false,
            errors: "Token is invalid or has expired!"
        })
    }
    //Ensuring that cart is a Object and not a list
    if (typeof userData.cart !== 'object' || Array.isArray(userData.cart) || !userData.cart) {
        userData.cart = {};
    }
    if (!userData.cart[req.body.itemId]) {
        userData.cart[req.body.itemId] = [];
    }
    userData.cart[req.body.itemId].push(req.body.size);
    try {   
        await Users.findOneAndUpdate({id:req.user.id},{cart:userData.cart}, { new: true, useFindAndModify: false });
        res.status(200).json({
            success: true,
            message: "Added"
        });
    } catch (error) {
            console.log("Error")
        res.status(400).json({
            success: false,
            errors: "Error Occuring while Updating"
        })
    }
}

exports.gettingCart = async (req,res)=>{
    let userData = await Users.findOne({id:req.user.id});
    if(!userData) {
        return res.status(400).json({
            success: false,
            errors: "Token is invalid or has expired!"
        })
    }
    res.send(userData.cart);
}