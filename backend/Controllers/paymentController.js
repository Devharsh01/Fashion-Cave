const Users = require("../Models/UserModel")
const Orders = require("../Models/OrderModel")
const stripe = require("stripe")("sk_test_51PYU0E2KealGAmklRofLS4AVyT5ZjcLNeseqdPexbRMHPSaVCY5QF1GV6DlkMUF3Oy38Kwjz859DvAE7mVAa84tW00kUpHqnbw")

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
        const newOrder = new Orders({
            orderId: id1,
            userId: req.user.id,
            quantity: req.body.quantity,
            amount: req.body.amount,
            items: req.body.items,
            paymentMethod: "Payment Card"
        })
        await newOrder.save();
        console.log(req.body.items)
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
        const session = await stripe.checkout.sessions.create({
            line_items: line_item,
            mode: "payment",
            success_url:`http://localhost:3000/checkout?success=true&order=${id1}`,
            cancel_url:`http://localhost:3000/checkout?success=false&order=${id1}`
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
        const newOrder = new Orders({
            orderId: id1,
            userId: req.user.id,
            quantity: req.body.quantity,
            amount: req.body.amount,
            items: req.body.items,
            paymentMethod: "Payment->Cash On Delivery"
        })
        await newOrder.save();
        console.log("Successful done", id1)
        res.json({success:true, orderId: id1 })
    }catch(err) {
        console.log(err)
        res.json({success:false, errors: "Some error "})
    } 
}