const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const crypto = require('crypto');

//For Adding User Details
const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        select: false                                       //This ensures that password is not shown when data collected from MongoDB server
    },
    address: {
        type: Object,
        default: [],
    },
    orderedItems: {
        type: Object,
        default: [],
    },
    cart: {
        type: Object,
        default: [],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
})

userSchema.pre('save', async function(next) {       //Hashing the password
    if(!this.isModified('password'))        //If the password is Modified, return
        return next()
    
    //Encrypt the password before saving
    this.password = await bcryptjs.hash(this.password, 13);
    next();
})

//Checking the Password
userSchema.methods.comparePassword = async function(pswd, pswdDB) {
    return await bcryptjs.compare(pswd, pswdDB);
}

//Generate the token for password reset
userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');     //Encrypts the Token and stores
    this.passwordResetTokenExpires = Date.now() + 10*60*1000;                                //Expires in 10 minutes
    return resetToken
}

const Users = mongoose.model('Users',userSchema);

module.exports = Users;