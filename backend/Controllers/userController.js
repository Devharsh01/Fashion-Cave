const Users = require('../Models/UserModel')

exports.allUsers = async (req, res) => {
    let users = await Users.find({})
    res.send(users);
}

exports.userDetails = async (req,  res) => {
    try {
        let user = await Users.findOne({id: req.user.id})
        if(!user) {
            return res.status(404).json({"success": false, "message": "User not found"})
        }
        return res.status(200).json({"success": true, "user": user})
    } catch (error) {
        return res.status(404).json({"success":false, "message": "Some error occured"})
    }
}