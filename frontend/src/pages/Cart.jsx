/*Cart page of the window */
import React from 'react'
import CartItems from '../components/CartItems/CartItems'
import './CSS/Cart.css'

const Cart = () => {
    return (
        <div className='main-cart'>
            <CartItems/>
        </div>
    )
}


export default Cart