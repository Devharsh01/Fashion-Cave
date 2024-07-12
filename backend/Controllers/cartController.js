const Users = require('../Models/UserModel')

exports.remove = async (req,res)=>{
    console.log("removed", req.body.itemId)
    let userData = await Users.findOne({id:req.user.id});
    if(!userData) {
        return res.status(400).json({
            success: false,
            errors: "Token is invalid or has expired!"
        })
    }
    try {
        if(userData.cart[req.body.itemId]>0)
            userData.cart[req.body.itemID] -= 1;
        await Users.findOneAndUpdate({id:req.user.id},{cart:userData.cart});
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
    userData.cart[req.body.itemId] += 1;
    try {   
        await Users.findOneAndUpdate({id:req.user.id},{cart:userData.cart}, { new: true, useFindAndModify: false });
        console.log("Added", req.user.id, req.body.itemId, userData.cart)
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