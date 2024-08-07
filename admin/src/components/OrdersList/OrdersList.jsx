import React from "react";
import './OrdersList.css';
import { useState} from "react";
import { useSearchParams } from 'react-router-dom';
import { AdminContext } from "../../Context/adminContext";
import { useContext } from "react";
import { useEffect } from "react";
import CrossIcon from './CrossIcon.jsx'
import TickIcon from './TickIcon.jsx'

const OrdersList = () => {
    const {url} = useContext(AdminContext)
    const [allOrders, setAllOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [searchParams] = useSearchParams();
    const [showDelivered, setShowDelivered] = useState(false);
    const status = searchParams.get("status");

    const fetchOrderInfo = async () =>{
        await fetch(`${url}/allOrders`)
        .then((res)=>res.json())
        .then((data)=>{setAllOrders(data)});
        console.log("Info Fetched")
    }
    
    const filterOrders = () => {
        const filter = status === "Completed" ? showDelivered ?
            allOrders.filter((order)=>order.status === "Delivered") :
            allOrders.filter((order)=>order.status === "Delivered" || order.status === "Cancelled") :
            allOrders.filter((order)=>order.status === "Payment Done");
        setFilteredOrders(filter)
        console.log(filter)
    }

    const changeStatus = async ({newStatus, orderId, productId}) => {
        let responseData;
        console.log("NewStatus ", newStatus)
        await fetch(`${url}/updateStatus`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({status: newStatus, orderId: orderId, productId: productId}),
        }).then((res)=>res.json())
        .then((data)=>{responseData=data});
        if(responseData.success) {
            alert("Order Status Updated")
            window.location.reload()
        }
        else {
            alert(responseData.error)
        }

    }

    useEffect(()=>{
        filterOrders();
    },[status, allOrders, showDelivered])

    useEffect(() => {
        fetchOrderInfo();
    },[])

    return (

        <div className="ordersList">
            <div className="ordersList-heading">
                <h1>Orders {status}</h1>
                {status === "Completed" ?<div className="ordersList-input">
                    <input id="show" type="checkbox" onChange={()=>{setShowDelivered(!showDelivered)}}/>
                    <label for="show">Show Only Delivered</label>
                </div> : <></>}
            </div>
            { Object.keys(filteredOrders).length > 0 ?
            <div className="userinfo-eachorder">
                {filteredOrders.map((eachOrder, index) => {
                return <div className="orderDescription">
                    <div className={`orderinfo-alldetails`}>
                        <div className="orderinfo-details">
                            <div className={`orderinfo_content ${eachOrder.status==="Delivered"?"accepted":eachOrder.status==="Cancelled"?"declined":"processing"}`}><p>Status:              </p>{eachOrder.status}</div>
                            <div className="orderinfo_content"><p>Order ID:               </p>{eachOrder.orderId}</div>
                            <div className="orderinfo_content"><p>Order Name:          </p>{eachOrder.items.name}</div>
                            <div className="orderinfo_content"><p>Order Quantity:    </p>{eachOrder.quantity}</div>
                            <div className="orderinfo_content"><p>Order Amount:      </p>{eachOrder.amount}</div>
                            <div className="orderinfo_content"><p>Size:                         </p>{eachOrder.items.size.join(' , ')}</div>
                        </div>
                        <div className="orderimage">
                            <img src={eachOrder.items.image} alt="" />
                        </div>
                        {status === "Pending" ? <div className="orderlist-buttons">
                            <button className="checkButton" onClick={()=>{changeStatus({ newStatus: "Delivered", orderId: eachOrder.orderId, productId: eachOrder.items.id })}}>
                                <TickIcon/>
                            </button>
                            <button className="cancelButton" onClick={()=>{changeStatus({ newStatus: "Cancelled", orderId: eachOrder.orderId, productId: eachOrder.items.id })}}>
                                <CrossIcon/>
                            </button>
                        </div> : <></>}
                    </div>
                    <hr/> 
                    </div>
                    })}
            </div> : <div>Please Order something</div>}
        </div>
    )
}

export default OrdersList;