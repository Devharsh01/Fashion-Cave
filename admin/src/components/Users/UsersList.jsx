import React, { useEffect, useState } from "react";
import './UsersList.css'
import { useContext } from "react";
import { AdminContext} from "../../Context/adminContext";

const Users = () =>{

    const {url} = useContext(AdminContext)
    const [allusers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');

    const fetchInfo = async () =>{
        await fetch(`${url}/allusers`)
        .then((res)=>res.json())
        .then((data)=>{setAllUsers(data);setFilteredUsers(data)});
    }
    useEffect(() => {
        fetchInfo();
    },[])

    // Recursive function to check if search string is in the user object
    const containsSearchString = (value) => {
        if (typeof value === 'string') {
            return value.toLowerCase().includes(search.toLowerCase());
        } else if (typeof value === 'object') {
            return Object.values(value).some((nestedValue) => 
                containsSearchString(nestedValue, search)
            );
        } else if (Array.isArray(value)) {
            return value.some((arrayValue) => 
                containsSearchString(arrayValue, search)
            );
        }
        return false;
    };

    useEffect(()=>{
        const filtered = search ? 
        allusers.filter((user) => containsSearchString(user))
        : allusers;
        setFilteredUsers(filtered);
    },[search])

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    return(
        <div className="users">
            <div className="users-heading">
                <h1>All Users List</h1>
                <input type="text" placeholder="Enter To Search..." value={search} onChange={handleSearchChange} />
            </div>
            <div className="listusers-allusers">
                {filteredUsers.length >0 ? filteredUsers.map((user,index)=>{
                    return <>
                    <div className="userinfo-alldetails">
                        <div className="userinfo-details">
                            <div className="userinfo_content"><p>Id:                  </p>{user.id}</div>
                            <div className="userinfo_content"><p>Name:            </p>{user.name}</div>
                            <div className="userinfo_content"><p>Email:            </p>{user.email}</div>
                            <div className="userinfo_content"><p>Mobile No.:    </p>{user.address.mobile_no ? user.address.mobile_no: "Not Available"}</div>
                            <div className="userinfo_content"><p>Address:         </p>{ Object.keys(user.address).length > 0 ? `${user.address.location}, ${user.address.street}, ${user.address.locality}, ${user.address.city}, ${user.address.state}`  :"Not Available"}</div>
                            { Object.keys(user.address).length > 0 ?<div className="userinfo_content"><p>                        </p>{user.address.pincode}</div> : <></>}
                            <div className="userinfo_content"><p>Orders</p></div>
                        </div>
                        { Object.keys(user.orderedItems).length > 0 ?
                        <div className="userinfo-eachorder">
                             {user.orderedItems.map((eachOrder, index) => {
                                return <div className="orderDescription">
                                    <div className={`orderinfo-alldetails`}>
                                        <div className="orderinfo-details">
                                            <div className={`orderinfo_content ${eachOrder.status==="Delivered"?"accepted":eachOrder.status==="Cancelled"?"declined":"processing"}`}><p>Status:                 </p>{eachOrder.status}</div>
                                            <div className="orderinfo_content"><p>Product ID:                </p>{eachOrder.orderId}</div>
                                            <div className="orderinfo_content"><p>Product Name:          </p>{eachOrder.items.name}</div>
                                            <div className="orderinfo_content"><p>Product Quantity:     </p>{eachOrder.quantity}</div>
                                            <div className="orderinfo_content"><p>Product Amount:      </p>{eachOrder.amount}</div>
                                            <div className="orderinfo_content"><p>Size:                            </p>{eachOrder.items.size.join(' , ')}</div>
                                        </div>
                                        <div className="orderimage">
                                            <img src={eachOrder.items.image} alt="" />
                                        </div>
                                    </div>
                                    {/* </div> */}
                                    <hr/> 
                                </div>
                            })}
                            </div> : <div>Please Order something</div>}
                        </div>
                    <hr/>
                    </>
                }) : <div>No User Found</div>} 
            </div>
        </div>
    )
}

export default Users;