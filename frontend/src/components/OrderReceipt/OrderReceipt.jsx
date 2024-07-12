import React, { useEffect } from 'react'
import './OrderReceipt.css'

const OrderReceipt = ({current}) => {
    useEffect(()=>{
        console.log("Current", current)
    })
    return (
        <div class="orderCard"> 
            <div class="header">
                <div class={`div_image_v ${current==="orderSuccess" ? "image_success":current==="orderFailed"?"image_failure":"image_pending"}`}>
                    <div class="image">
                        {current=== "orderSuccess"?<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>:
                         current === "orderFailed" ?<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18 6L6 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L18 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>:
                         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12 Q6 2, 12 12 T 24 12" stroke="#000000" stroke-width="1.5" fill="none" /></svg>
                        }
                    </div> 
                </div> 
                <div class="content">
                    <span class={`title ${current==="orderSuccess" ? "title_success":current==="orderFailed"?"title_failure":"title_pending"}`}>
                        {current === "orderSuccess" ? "Order Validated" : current === "orderFailed" ? "Order Failed": "Order Pending"}
                    </span> 
                    <p class="message">
                        {current === "orderSuccess" ? "Thank you for your purchase. Your package will be delivered within 7 working days of your purchase"
                        :current === "orderFailed" ? "Some error occured while your payment! Your order has been cancelled" 
                        : "Your Order is being processed! DO NOT REFRESH THIS PAGE"}
                    </p> 
                    <p className="message">Directing you to the Home Page <span className="">. . . </span> </p>
                </div>
            </div> 
        </div>
    )
}

export default OrderReceipt;