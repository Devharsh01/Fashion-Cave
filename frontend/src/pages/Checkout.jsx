import React, { useEffect, useState, useContext } from 'react';
import './CSS/Checkout.css'
import Address from '../components/Address/Address'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import PaymentGateway from '../components/PaymentGateway/PaymentGateway';
import OrderReceipt from '../components/OrderReceipt/OrderReceipt';

const Checkout = () => {
    const [current, setCurrent] = useState('address')
    const {getOrderProducts, getTotalCartItems, getTotalCartAmount, orderData, url} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const order = searchParams.get("order")

    useEffect(()=>{
        if(success != null && order != null)
                setCurrent('orderVerify')
    },[]) 
    
    useEffect(()=>{
        if(current == "paymentCard") {
            async function fetchOrder() {
                const orders = await getOrderProducts();
                console.log("Orderdata",orderData);
                let resp;
                await fetch(`${url}/paymentCard`,{
                    method:"POST",
                    headers:{
                        Accept:"Application/form-data",
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({"items":orders})
                })
                .then((response)=>response.json()).then((data)=>resp = data)
                console.log("Card",resp)
                if(resp.success) {
                    const session_url = resp.session_url;
                    window.location.replace(session_url)
                }
            }
            fetchOrder();
        }
        else if(current=="paymentCOD") {
            async function fetchOrderCOD() {
                const orders = await getOrderProducts();
                console.log("Orderdata",orderData);
                let resp;
                await fetch(`${url}/paymentCOD`,{
                    method:"POST",
                    headers:{
                        Accept:"Application/form-data",
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({"items":orders})
                })
                .then((response)=>response.json()).then((data)=>resp = data)
                console.log("Cash",resp)
                if(resp.success) {
                    window.location.replace(`${window.location.origin}/checkout?success=true&order=${resp.orderId}`)
                }
            }
            console.log("FETCHING COD")
            fetchOrderCOD();
        }
        else if(current == "orderVerify") {
            if(success == "true")
                setCurrent("orderSuccess")
            else
                setCurrent("orderFailed")
        }
        else if(current == "orderSuccess" || current == "orderFailed") {
            async function fetchOrder() {
                let response;
                await fetch(`${url}/${current}`,{
                    method:"POST",
                    headers:{
                        Accept:"Application/form-data",
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({"orderId": parseInt(order, 10)})
                })
                .then((response)=>response.json()).then((data)=> response=data)
                setTimeout(() => {
                    window.location.replace(`${window.location.origin}`)
                }, 5000);
            }
            fetchOrder();
        }
    },[current])

    return(
        <div className="checkout">
            <div className="checkout-left">
                <div className={`${current === 'address'?"checkout-headings":"dull"} address-heading`}> <h2>Address Details</h2> </div>
                <hr />
                <div className={`${current === 'payment'?"checkout-headings":"dull"} payment-heading`}> <h2>Payment Setup</h2> </div>
                <hr />
                <div className={`${(current !== 'payment' && current !== 'address')?"checkout-headings":"dull"} order-heading`}> <h2>Order Receipt</h2> </div>
                <hr />
            </div>
            <div className="checkout-right">
                {
                    current === 'address' ? <div> <Address changeCurrent={setCurrent}/> </div> : 
                    current === 'payment' ? <div> <PaymentGateway changeCurrent={setCurrent}/> </div> : 
                    <div> <OrderReceipt current={current}/> </div>
                }
            </div>
        </div>
    )
}

export default Checkout;