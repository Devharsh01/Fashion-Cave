const Product = require('../Models/productModel')

exports.addProduct = async (req, res) =>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else
        id = 1;
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    try{
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
    }catch(err){
        console.log("Error occured while saving");
    }
}

exports.allProducts = async (req, res)=>{
    let products = await Product.find({})
    res.send(products);
}

exports.product = async (req,res)=>{
    const {productId} = req.params;
    let prod = await Product.findOne({id: productId})
    if(!prod) {
        res.status(404).json({
            success: false,
            errors: "Product Not Found"
        })
    }
    else{
        res.status(200).send(prod)
    }
}