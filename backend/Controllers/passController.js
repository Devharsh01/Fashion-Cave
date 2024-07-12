const jwt = require("jsonwebtoken")
const Users = require("../Models/UserModel")
const sendEmail = require('../Utils/email')
const crypto = require('crypto');

exports.forgotPassword = async (req,res,next) => {
    //GET USER EMAIL
    try {
        const user = await Users.findOne({email: req.body.email})
        if(!user) {
            res.status(400).json({
                success: false,
                errors: "User does not exist"
            })
        }
        const resetToken = user.createResetPasswordToken();
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
        const message = `We have received your password reset request. Please use the below Link to reset your password\n\n${resetUrl}\n\nThis Reset Link will expire in 10 minutes`
        try{
            // await sendEmail({
            //     email: user.email,
            //     subject: 'Password Reset Link',
            //     message: message,
            // });
            
            res.status(200).json({
                success: true,
                message: message,
            })
        }catch(err){
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;
            await user.save()
        }


    } catch (error) {
        res.status(400).json({
            success: false,
            errors: "Forgot Password Failed"
        })
    }
}

exports.resetPassword = async (req,res,next) => {
    //Checking if user or token is valid or not
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await Users.findOne({passwordResetToken: token, passwordResetTokenExpires: {$gt: Date.now()}})
    if(!user) {
        return res.status(400).json({
            success: false,
            errors: "Token is invalid or has expired!"
        })
    }

    //Reseting the Password
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    user.save();

    res.status(200).json({
        success:true,
    })
}

exports.updatePassword = async(req, res, next) => {
    //GET USER FROM DATABASE
    const user = await Users.findById(req.user.id).select("+password");

    //CHECK IF THE CURRENT PASSWORD IS CORRECT
    if(!(await user.comparePassword(req.body.currentPassword, user.password))) {
        return res.status(401).json({
            success: false,
            errors: "The Current password does not match",
        })
    }

    //UPDATE USER PASSWORD WITH NEW VALUE
    user.password = req.body.password;
    await user.save();

    //LOGIN USER AND SEND JWT
    const token = jwt.sign({id: user.id, email: user.email}, "ase240f-ds23/ds31-de-34t42-4vcb", {
        expiresIn: 300000000
    })
    res.status(200).json({
        success: true,
        token: token
    })
}