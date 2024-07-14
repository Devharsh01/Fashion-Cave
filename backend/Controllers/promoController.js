const Promo = require('../Models/promoModel')

exports.addPromo = async (req,res)=>{
    let promos = await Promo.find({})
    let id = promos.length+1;
    const promo = new Promo({
        id: id,
        name: req.body.name,
        off_price: req.body.off_price,
        validity_till: req.body.validity_till,
        validity_start: req.body.validity_start,
    });
    console.log(promo);
    try{
        await promo.save();
        res.json({
            success:true,
            name: req.body.name,
        })
    }catch(err) {
        console.log("Error occured while saving promo");
        res.status(401).send()
    }
}

exports.allPromos = async (req, res)=>{
    let promos = await Promo.find({})
    res.send(promos);
}