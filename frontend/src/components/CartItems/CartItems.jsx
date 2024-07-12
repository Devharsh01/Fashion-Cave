import React, { useContext, useEffect, useState } from "react";
import './CartItems.css'
import { Link } from 'react-router-dom'
import { ShopContext } from "../../context/ShopContext";
import AddIcon from "../Assets/AddIcon";
import SubstractIcon from "../Assets/SubstractIcon";
import cross_icon from '../Assets/cart_cross_icon.png'

const CartItems = ({showCart, setShowCart}) => {
    const {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, allPromos,setPromoCode, promoCode} = useContext(ShopContext);
    const [addHover, setAddHover] = useState(false)             //For Add Button Color Change
    const [idHover, setIdHover] = useState(0)                   //For Substract Button Color Change
    const [substractHover, setSubstractHover] = useState(false)     //For Specific id Button Color Change
    const [inputValue, setInputValue] = useState('');
    const [isSliding, setIsSliding] = useState(false);
    
    const totalAmount = () => {
        let total = getTotalCartAmount();
        total -= ((totalAmount*promoCode)/100);
        return total;
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const checkoutButtonClicked = () => {
        if(getTotalCartAmount() > 0) {
            window.location.replace(`http://localhost:3000/checkout`)
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

    let shown = 0;
    return(
        <div className={`cart ${showCart ? "relative-half":""}`}>
        <div className={`${showCart ? `cartitemsHalf ${isSliding ? 'slide-out':""}`:"cartitems"}`}>
            {showCart? <img src={cross_icon} alt="" className="cartitems-cross" onClick={()=>{setIsSliding(true)}}/> :<></>}
            <div className={`${showCart ? "cartitems-format-mainHalf":"cartitems-format-main"}`}>
                <p>Products</p>
                <p className={`${showCart ?"cartitems-titleHalf":""}`}>Title</p>
                <p className={`${showCart ?"cartitems-priceTitleHalf":""}`}>Price</p>
                <p>Quantity</p>
                <p>Total</p>
            </div> 
            <hr />
            <div className={`${showCart ? "cartitems-displayHalf":"cartitems-display"}`}>
                {all_product.map((e)=>{
                    if(cartItems[e.id]>0)
                    {
                        shown = 1;
                        return <div>
                                <div onMouseEnter={()=>{setIdHover(e.id)}} onMouseLeave={()=>{setIdHover(0)}} className={`${showCart ? "cartitems-formatHalf cartitems-format-mainHalf":"cartitems-format cartitems-format-main"}`}>
                                    <img src={e.image} alt="" className="cartitems-product-icon" />
                                    <p className={`${showCart ?"cartitems-nameHalf":"cartitems-name"}`} >{e.name}</p>
                                    <p className={`${showCart ?"cartitems-priceHalf":"cartitems-price"}`}>${e.new_price}</p>
                                    <div className={`${showCart?"cartitems-quantityHalf":"cartitems-quantity"}`}>
                                        <div onMouseEnter={()=>{setAddHover(true)}} onMouseLeave={()=>{setAddHover(false)}} onClick={()=>{addToCart(e.id)}}><AddIcon color={`${idHover===e.id?addHover?"#00ff15":showCart?"#000":"#fff":showCart?"#000":"#fff"}`}></AddIcon></div>
                                        {cartItems[e.id]}
                                        <div onMouseEnter={()=>{setSubstractHover(true)}} onMouseLeave={()=>{setSubstractHover(false)}} onClick={()=>{removeFromCart(e.id)}}><SubstractIcon color={`${idHover===e.id?substractHover?"red":showCart?"#000":"#fff":showCart?"#000":"#fff"}`}></SubstractIcon></div>
                                    </div>
                                    <p className={`cartitems-totalPriceHalf`}>${e.new_price*cartItems[e.id]}</p>
                                </div>
                                <hr />
                            </div>
                    }
                    return null;
                })}
                { shown === 0? <p>Cart is Empty</p>:<></>}
            </div>
            <div className={`${showCart ? "cartitems-downHalf":"cartitems-down"}`}>
                <div className={`${showCart ? "cartitems-totalHalf":"cartitems-total"}`}>
                    <h1>Cart Totals</h1>
                    <div className={`${showCart ? "cartitems-detailsHalf": "cartitems-details"}`}>
                        <div className={`${showCart ? "cartitems-total-itemHalf":"cartitems-total-item"}`}>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className={`${showCart ? "cartitems-total-itemHalf":"cartitems-total-item"}`}>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className={`${showCart ? "cartitems-total-itemHalf":"cartitems-total-item"}`}>
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
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
                                <h3>${getTotalCartAmount()}</h3>
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