const Users = require('../Models/UserModel')

exports.allUsers = async (req, res) => {
    let users = await Users.find({})
    res.send(users);
}