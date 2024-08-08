import React, { useContext, useEffect, useState } from "react";
import './CartItems.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../../context/ShopContext";
import AddIcon from "../Assets/AddIcon";
import SubstractIcon from "../Assets/SubstractIcon";
import cross_icon from '../Assets/cart_cross_icon.png'

const CartItems = ({showCart, setShowCart}) => {
    const {all_product, cartItems, sizeSelected, addToCart, removeFromCart, getTotalCartAmount, allPromos,setPromoCode, promoCode} = useContext(ShopContext);
    const [inputValue, setInputValue] = useState('');
    const [isSliding, setIsSliding] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    function totalAmount () {
        let total = getTotalCartAmount();
        const discount = total*(100/(100-promoCode));
        return discount;
    }

    useEffect(()=>{
        if(redirect){
            navigate("/checkout");
        }
    },[redirect])

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const checkoutButtonClicked = () => {
        if(getTotalCartAmount() > 0) {
            setRedirect(true)
        }
        else {
            alert("Insert atleast one item")
        }
    }

    const handleButtonClick = () => {
        const promos = allPromos.find((e)=> e.name === inputValue)
        {promos !== undefined? setPromoCode(promos.off_price):setPromoCode(0)}
    };

    useEffect(()=>{
        {isSliding ? setTimeout(() => {
            setIsSliding(false);
            setShowCart(false);
          }, 1000) : <></>} 
    },[isSliding])

    return(
        <div className={`cart ${showCart ? "relative-half":""}`}>
        <div className={`${showCart ? `cartitemsHalf ${isSliding ? 'slide-out':""}`:"cartitems"}`}>
            {showCart? <img src={cross_icon} alt="" className="cartitems-cross" onClick={()=>{setIsSliding(true)}}/> :<></>}
            <div className={`${showCart ? "cartitems-format-mainHalf":"cartitems-format-main"}`}>
                <p>Products</p>
                <p className={`${showCart ?"cartitems-titleHalf":"cartitems-title"}`}>Title</p>
                <p className={`${showCart ?"cartitems-priceTitleHalf":""}`}>Price</p>
                <p>Quantity/Size</p>
                <p>Total</p>
            </div> 
            <hr />
            <div className={`${showCart ? "cartitems-displayHalf":"cartitems-display"}`}>
                {Object.keys(cartItems).length>0 ? Object.entries(cartItems).map(([ele,size])=>{
                    let e = all_product.find((product)=>product.id===Number(ele))
                    const sizeCount = cartItems[ele].reduce((acc, size) => {        //Calculate each item size
                        acc[size] = (acc[size] || 0) + 1;
                        return acc;
                      }, {});                      
                    if(e){
                        return <div>    
                                <div className={`${showCart ? "cartitems-formatHalf cartitems-format-mainHalf":"cartitems-format cartitems-format-main"}`}>
                                    <img src={e.image} alt="" className="cartitems-product-icon" />
                                    <p className={`${showCart ?"cartitems-nameHalf":"cartitems-name"}`} >{`${e.name} (Size ${size}) `}</p>
                                    <p className={`${showCart ?"cartitems-priceHalf":"cartitems-price"}`}>${e.new_price}</p>
                                    <div className="cartitems-quantityAll">
                                        {Object.entries(sizeCount).map(([size, count]) => (
                                            <div className={`${showCart?"cartitems-quantityHalf":"cartitems-quantity"}`} >
                                                <div onClick={()=>{addToCart(e.id,size)}}><AddIcon color={`${showCart?"#000":"#fff"}`}></AddIcon></div>
                                                {count} / {size}
                                                <div onClick={()=>{removeFromCart(e.id,size)}}><SubstractIcon color={`${showCart?"#000":"#fff"}`}></SubstractIcon></div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className={`cartitems-totalPriceHalf`}>${e.new_price*cartItems[ele].length}</p>
                                </div>
                                <hr />
                            </div>
                    }
                    return null;
                }):<p>Cart is Empty</p>}
            </div>
            <div className={`${showCart ? "cartitems-downHalf":"cartitems-down"}`}>
                <div className={`${showCart ? "cartitems-totalHalf":"cartitems-total"}`}>
                    <h1>Cart Totals</h1>
                    <div className={`${showCart ? "cartitems-detailsHalf": "cartitems-details"}`}>
                        <div className={`${showCart ? "cartitems-total-itemHalf":"cartitems-total-item"}`}>
                            <p>Subtotal</p>
                            <p>₹{promoCode ? totalAmount(): getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className={`${showCart ? "cartitems-total-itemHalf":"cartitems-total-item"}`}>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className={`${showCart ? "cartitems-total-itemHalf":"cartitems-total-item"}`}>
                            <h3>Total</h3>
                            <h3>₹{promoCode ? totalAmount(): getTotalCartAmount()}</h3>
                        </div>
                        {promoCode !== 0 ?
                        <div>
                            <hr/>
                            <div className={`${showCart ? "cartitems-total-itemHalf":"cartitems-total-item"}`}>
                                <p>Offer</p>
                                <p>{promoCode}%</p>
                            </div>
                            <hr/>
                            <div className={`${showCart ? "cartitems-total-itemHalf":"cartitems-total-item"}`}>
                                <h3>Final Amount</h3>
                                <h3>₹{getTotalCartAmount()}</h3>
                            </div>
                        </div>
                        :<></>}
                    </div>
                </div>
                <div className="cartitems-final">
                    {showCart?<></>:<div className="cartitems-promocode">
                        <p>Enter your Promo Code Here</p>
                        <div className="cartitems-promobox">
                            <input value={inputValue} onChange={handleChange} type="text" placeholder="Promo Code" />
                            <button onClick={handleButtonClick}>Submit</button>
                        </div>
                    </div>}
                    {showCart?<Link onClick={()=>{setIsSliding(true)}} to="/cart"> <button className="cartitems-buttonHalf"> PROCEED TO CART</button></Link>:<Link onClick={checkoutButtonClicked}> <button className="cartitems-button"> PROCEED TO CHECKOUT</button></Link>}
                </div>
            </div>
        </div>
        </div>
    )
}

export default CartItems