import React, { useContext, useEffect, useState } from "react";
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import { useParams } from 'react-router-dom';
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from "../../context/ShopContext";
import AddToCart from "../Assets/AddToCart.jsx"

const ProductDisplay = (props) => {
    const {addToCart, product, getProduct} = useContext(ShopContext);
    const {productId} = useParams();
    const [selected, setSelected] = useState("");

    useEffect(()=>{
        window.scrollTo({top: 0, behavior:"smooth"})
    },[])
 
    useEffect(()=>{
        getProduct(productId);
    },[productId])

    const getLogin = () => {
        const btn = document.getElementById('loginButton');
        setTimeout(()=>{
            btn.click();
        }, 100)
    }

    return(
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="" />
                </div>
            </div> 
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A light, knitted shirt with good quality
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                    {product.size && Object.keys(product.size).length>0 ? product.size.map(sizes =>
                        <button
                            key={sizes}
                            className={selected === sizes ? "isSelected" : ""}
                            onClick={() => setSelected(sizes)}
                        >
                            {sizes}
                        </button>
                    ): "No Size Available Currently"}
                    </div>
                </div>
                <div onClick={() => {{localStorage.getItem('auth-token')?selected!==''?addToCart(product.id,selected):alert("Please select a size"):getLogin()}}}>
                    <AddToCart></AddToCart>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay