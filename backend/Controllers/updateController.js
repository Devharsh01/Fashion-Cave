const Users = require("../Models/UserModel")
const Orders = require("../Models/OrderModel.js")

exports.address = async (req, res) => {
    try {
        const user = await Users.findOneAndUpdate({id: req.user.id}, { address: req.body.address }, { new: true });
    
        if (!user) {
            return res.status(404).json({ success: false, errors: 'User not found' });
        }
    
        res.status(200).json({ success: true, message: 'Address updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Server error' });
    }
}

exports.statusSuccess = async (req, res) => {
    try {
        const order = await Orders.findOneAndUpdate({orderId: req.body.orderId}, {status: "Payment Done"}, { new: true })
        if (!order) {
            return res.status(404).json({ success: false, errors: 'Order not found' });
        }
        //Reset the Cart for the user
        let cart = {};                              //Cart for each user
        for(let i = 0;i<300;i++){
            cart[i] = 0;
        }
        const user = await Users.findOneAndUpdate({id: req.user.id}, {cart: cart}, { new: true })
        if (!user) {
            return res.status(404).json({ success: false, errors: 'User not found' });
        }
        let newOrder = await Orders.findOne({orderId: req.body.orderId})
        let newUser = await Users.findOneAndUpdate({id: req.user.id}, {$push: {orderedItems: newOrder}}, {new: true})
        if(!newUser){
            return res.status(404).json({success: false, errors: "User Order List Not Updated"})
        }
        res.status(200).json({ success: true, message: 'Payment Done successfully' });
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Server error' });
    }
}

exports.statusFailed = async (req, res) => {
    try {
        const order = await Orders.findOneAndUpdate({orderId: req.body.orderId}, {status: "Payment Failed"}, { new: true })
        if (!order) {
            return res.status(404).json({ success: false, errors: 'Order not found' });
        }
        let cart = {};                              //Cart for each user
        for(let i = 0;i<300;i++){
            cart[i] = 0;
        }
        //Reset Cart for the User
        const user = await Users.findOneAndUpdate({id: req.user.id}, {cart: cart}, { new: true })
        if (!user) {
            return res.status(404).json({ success: false, errors: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'Payment Failed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Server error' });
    }
}