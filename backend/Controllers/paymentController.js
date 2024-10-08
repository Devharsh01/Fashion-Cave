const Users = require("../Models/UserModel")
const Orders = require("../Models/orderModel.js")
require('dotenv').config();
const stripe = require("stripe")(process.env.stripe_info)

exports.payCard = async (req, res) => {
    try { 
        let orders = await Orders.find({});
        let id1;
        if(orders.length>0){
            let last_order_array = orders.slice(-1);
            let last_order = last_order_array[0];
            id1 = last_order.orderId + 1;
        }
        else
            id1 = 1;
        let newOrder;
        for (const item of req.body.items) { 
            newOrder = new Orders({
                orderId: id1,
                userId: req.user.id,
                quantity: item.quantity,
                amount: item.new_price*item.quantity,
                items: item,
                paymentMethod: "Payment Card"
            })
            await newOrder.save();
        }
        const line_item = req.body.items.map((item)=>({
            price_data: {
                currency: "inr",
                product_data:{
                    name: item.name
                },
                unit_amount: item.new_price*100,
            },
            quantity: item.quantity
        }))
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const session = await stripe.checkout.sessions.create({
            line_items: line_item,
            mode: "payment",
            success_url:`${baseUrl}/checkout?success=true&order=${id1}`,
            cancel_url:`${baseUrl}/checkout?success=false&order=${id1}`
        })
        console.log("Successful, Send Response", session.url)
        res.json({success:true, session_url: session.url})
    }catch(err) {
        console.log(err)
        res.json({success:false, errors: "Some error "})
    }   
}

exports.payCOD = async (req, res) => {
    try {
        let orders = await Orders.find({});
        let id1;
        if(orders.length>0){
            let last_order_array = orders.slice(-1);
            let last_order = last_order_array[0];
            id1 = last_order.orderId + 1;
        }
        else
            id1 = 1;
        let newOrder;
        for (const item of req.body.items) { 
            newOrder = new Orders({
                orderId: id1,
                userId: req.user.id,
                quantity: item.quantity,
                amount: item.new_price*item.quantity,
                items: item,
                paymentMethod: "Payment->Cash On Delivery"
            })
            await newOrder.save();
        }
        console.log("Successful done", id1)
        res.json({success:true, orderId: id1 })
    }catch(err) {
        console.log(err)
        res.json({success:false, errors: "Some error "})
    } 
}