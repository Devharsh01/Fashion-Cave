
const Orders = require("../Models/orderModel.js")

exports.allOrders = async (req,res) => {
    try {
        let orders = await Orders.find({})
        res.send(orders);
    } catch (error) {
        res.status(404).json({success:false, error: "Some error occured"})
    }
}