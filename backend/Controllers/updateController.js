const Users = require("../Models/UserModel")
const Orders = require("../Models/orderModel.js")

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

exports.statusPaid = async (req, res) => {
    try {
        const order = await Orders.updateMany({orderId: req.body.orderId}, {status: "Payment Done"}, { new: true })
        if (!order) {
            return res.status(404).json({ success: false, errors: 'Order not found' });
        }
        //Reset the Cart for the user
        let cart = {};                              //Cart for each user

        const user = await Users.findOneAndUpdate({id: req.user.id}, {cart: cart}, { new: true })
        if (!user) {
            return res.status(404).json({ success: false, errors: 'User not found' });
        }
        let newOrder = await Orders.find({orderId: req.body.orderId})
        for(const eachOrder of newOrder) {
            let newUser = await Users.findOneAndUpdate({id: req.user.id}, {$push: {orderedItems: eachOrder}}, {new: true})
            if(!newUser){
                return res.status(404).json({success: false, errors: "User Order List Not Updated"})
            }
        }
        res.status(200).json({ success: true, message: 'Payment Done successfully' });
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Server error' });
    }
}

exports.statusFailed = async (req, res) => {
    try {
        const order = await Orders.updateMany({orderId: req.body.orderId}, {status: "Cancelled"}, { new: true })
        if (!order) {
            return res.status(404).json({ success: false, errors: 'Order not found' });
        }
        let cart = {};                              //Cart for each user
        //Reset Cart for the User
        const user = await Users.findOneAndUpdate({id: req.user.id}, {cart: cart}, { new: true })
        if (!user) {
            return res.status(404).json({ success: false, errors: 'User not found' });
        }
        let newOrder = await Orders.find({orderId: req.body.orderId})
        for(const eachOrder of newOrder) {
            let newUser = await Users.findOneAndUpdate({id: req.user.id}, {$push: {orderedItems: eachOrder}}, {new: true})
            if(!newUser){
                return res.status(404).json({success: false, errors: "User Order List Not Updated"})
            }
        }
        res.status(200).json({ success: true, message: 'Payment Failed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Server error' });
    }
}

exports.statusUpdate = async (req, res, next) => {
    try {
        let order = await Orders.findOneAndUpdate({orderId: req.body.orderId, 'items.id': req.body.productId}, {status: req.body.status}, {new:true})
        if (!order) {
            return res.status(404).json({ success: false, errors: 'Order not found' });
        }
        order = await Orders.findOne({ orderId: req.body.orderId });
        if (order) {
            const updatedUser = await Users.findOne({ id: order.userId });
            if (updatedUser) {
                // Update the orderedItems array
                const updatedOrderedItems = updatedUser.orderedItems.map(eachUserOrder => {
                    if (eachUserOrder.orderId === req.body.orderId && eachUserOrder.items.id === req.body.productId) {
                        eachUserOrder.status = req.body.status;
                    }
                    return eachUserOrder;
                });
                const finalUser = await Users.findOneAndUpdate({id: order.userId}, {orderedItems: updatedOrderedItems}, {new: true})
                
                res.status(200).json({success: true, message:"Status Updated Successfully"})
            } else {
                res.status(404).json({success: false, error:'User not found'});
            }
        } else {
            res.status(404).json({success: false, error:'Order not found'});
        }
    } catch (error) {
        res.status(404).json({success: false, error:'Some error occured'});
    }
}