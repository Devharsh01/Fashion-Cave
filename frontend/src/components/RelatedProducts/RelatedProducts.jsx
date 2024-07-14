import React, { useContext, useEffect, useState } from "react";
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Item from '../Items/Item.jsx'
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext.jsx";

const RelatedProducts = () => {
    const {filteredProducts, product} = useContext(ShopContext);
    const [dataProduct, setDataProduct] = useState([])

    useEffect(()=>{
        let relatedProducts = filteredProducts.filter(item => item.category === product.category && item.id !== product.id);
        setDataProduct(relatedProducts.slice(0,4));
    },[product])

    return(
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-items">
                {dataProduct.map((item, i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}

export default RelatedProducts