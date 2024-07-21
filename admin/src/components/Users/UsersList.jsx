import React, { useEffect, useState } from "react";
import './UsersList.css'
import { useContext } from "react";
import { AdminContext} from "../../Context/adminContext";

const Users = () =>{

    const {url} = useContext(AdminContext)
    const [allusers, setAllUsers] = useState([]);

    const fetchInfo = async () =>{
        await fetch(`${url}/allusers`)
        .then((res)=>res.json())
        .then((data)=>{setAllUsers(data)});
        console.log("Info Fetched")
    }
    useEffect(() => {
        fetchInfo();
    },[])

    return(
        <div className="users">
            <h1>All Users List</h1>
            <div className="listusers-allusers">
                {allusers.map((user,index)=>{
                    return <>
                    <div className="listusers-alldetails">
                    <div key = {index} className="listusers-details">
                        {console.log(user)}
                        <div className="listusers_content"><p>User ID: </p></div>
                        <div className="listusers_content"><p>Name: </p></div>
                        <div className="listusers_content"><p>Email: </p></div>
                        <div className="listusers_content"><p>Mobile No.: </p></div>
                        <div className="listusers_content"><p>Address: </p></div>
                        { Object.keys(user.address).length > 0 ?<div className="listusers_content"><p>                </p></div> : <></>}
                        { Object.keys(user.address).length > 0 ?<div className="listusers_content"><p>                </p></div> : <></>}
                        <div className="listusers_content"><p>Orders: </p></div>
                    </div>
                    <div key = {index} className="listusers-details">
                        {console.log(user)}
                        <div className="listusers_content-right">{user.id}</div>
                        <div className="listusers_content-right">{user.name}</div>
                        <div className="listusers_content-right">{user.email}</div>
                        <div className="listusers_content-right">{user.address.mobile_no ? user.address.mobile_no: "Not Available"}</div>
                        <div className="listusers_content-right">{Object.keys(user.address).length > 0 ? <>{user.address.first_name} {user.address.middle_name} {user.address.last_name}</> : "Not Available"}</div>
                        { Object.keys(user.address).length > 0 ?<div className="listusers_content-right"><>{user.address.location}, {user.address.street}, {user.address.locality}, {user.address.city}, {user.address.state}</></div> : <></>}
                        { Object.keys(user.address).length > 0 ?<div className="listusers_content-right"><>{user.address.pincode}</></div> : <></>}
                        <div className="listusers_content-right">{Object.keys(user.orderedItems).length > 0 ? 
                            user.orderedItems.map((order, orderIndex)=>{
                                console.log(order) 
                                return ( 
                                <div className="orders-content"> 
                                    <div>{order.orderId}</div>
                                    <hr/>
                                </div>
                            )}) 
                            : "Not Available"}</div>
                    </div>
                    </div>
                    <hr/>
                    </>
                })} 
            </div>
        </div>
    )
}

export default Users;