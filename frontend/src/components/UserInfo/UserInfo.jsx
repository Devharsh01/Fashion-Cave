import React, { useContext, useEffect, useRef, useState } from 'react';
import './UserInfo.css'
import { ShopContext } from '../../context/ShopContext';

const UserInfo = () => {

    const {getUserInfo} = useContext(ShopContext)
    const [user, setUser] = useState({})
    const prevScrollRef = useRef(0);

    const fetchUser = async () => {
        setUser(await getUserInfo())
    }

    const handleScroll = () => {                                
        //To prevent the left panel go outside container's boundries
        const container = document.getElementById('container');
        const stickyElement = document.getElementById('sticky-element');
        if(container && stickyElement) {
            const containerRect = container.getBoundingClientRect();
            const stickyRect = stickyElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            // Manage top height after scroll in tablets and mobiles
            if(window.innerWidth<800 && window.scrollY > 0 && !stickyElement.classList.contains('headingHeight')){
                stickyElement.classList.add('headingHeight')
            }
            else if(window.innerWidth<800 && window.scrollY === 0 && stickyElement.classList.contains('headingHeight')){
                stickyElement.classList.remove('headingHeight')
            }
            else if(window.innerWidth>800 && stickyElement.classList.contains('headingHeight')) {
                stickyElement.classList.remove('headingHeight');
            }

            // Calculate the distance from the bottom of the reference element to the bottom of the viewport
            if(viewportWidth > 800) {
                const distanceToBottom = viewportHeight - containerRect.bottom;
                
                if (containerRect.bottom <= stickyRect.bottom + 10) {
                    stickyElement.style.bottom = distanceToBottom + 'px';
                } else {
                    stickyElement.style.bottom = 'auto';
                }
            }
            else {
                const currentScrollTop = window.scrollY;
                if(currentScrollTop > prevScrollRef.current) {
                    console.log("down", currentScrollTop, prevScrollRef.current)
                    if(!stickyElement.classList.contains('disappear'))
                        stickyElement.classList.add('disappear')
                }
                else {
                    console.log("up", currentScrollTop, prevScrollRef.current)
                    if(stickyElement.classList.contains('disappear'))
                        stickyElement.classList.remove('disappear')
                }
                prevScrollRef.current = currentScrollTop;
            }

            //Change the selected tag on side panel
            const firstElement = document.getElementById('dashboard-panel');
            const secondElement = document.getElementById('orders-panel');
            const ordersHeading = document.getElementById('orders');
            let ordersRect;
            if(ordersHeading)
            {
                ordersRect = ordersHeading.getBoundingClientRect();

                if((ordersRect.top<=150 && viewportWidth>800) || (viewportWidth<800 && ordersRect.top<=200)) {
                    firstElement.classList.remove('selected');
                    secondElement.classList.add('selected');
                }
                else{
                    secondElement.classList.remove('selected');
                    firstElement.classList.add('selected');
                }
            }
        }
    }

    const handleClick = (id) => {
        let headingScrollTo;
        if(id == 'dashboard-panel') {
            headingScrollTo = document.getElementById('dashboard')
        }
        else {
            headingScrollTo = document.getElementById('orders')
        }
        if(headingScrollTo) {
            const headingRect = headingScrollTo.getBoundingClientRect();
            const scrollPosition = headingRect.top + document.documentElement.scrollTop;
            if(id == 'dashboard-panel') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }
            else {
                const viewportWidth = window.innerWidth;
                if(viewportWidth > 800) {
                    window.scrollTo({
                        top: scrollPosition -140,
                        behavior: 'smooth'
                    })
                }
                else {
                    window.scrollTo({
                        top: scrollPosition -200,
                        behavior: 'smooth'
                    })
                }
            }
        }
    }

    useEffect(()=>{
        fetchUser();

        window.addEventListener('scroll', handleScroll)
    },[])    

    return (
        <div className="userinfo" id='container'>
            <div className="userinfo-left" id='sticky-element'>                 {/*Left Panel */}
                <ul>
                    <li className="contents selected" id='dashboard-panel' onClick={()=>{handleClick('dashboard-panel')}} > Dashboard </li>
                    <li className="contents" id='orders-panel' onClick={()=>{handleClick('orders-panel')}} > Orders </li>
                </ul>
            </div>
            <div className="userinfo-right">
                { Object.keys(user).length >0? 
                <div className="userinfo-rightdata">                    
                    <div className="userinfo-dashboard">
                        <h1 id='dashboard'>DashBoard</h1>
                        <div className="userinfo-alldetails">
                            <div className="userinfo-details">
                                <div className="userinfo_content"><p>Name:           </p>{user.name}</div>
                                <div className="userinfo_content"><p>Email:            </p>{user.email}</div>
                                <div className="userinfo_content"><p>Mobile No.:   </p>{user.address.mobile_no ? user.address.mobile_no: "Not Available"}</div>
                                <div className="userinfo_content"><p>Address:       </p>{ Object.keys(user.address).length > 0 ? `${user.address.location}, ${user.address.street}, ${user.address.locality}, ${user.address.city}, ${user.address.state}`  :"Not Available"}</div>
                                { Object.keys(user.address).length > 0 ?<div className="userinfo_content"><p>                       </p>{user.address.pincode}</div> : <></>}
                            </div>
                        </div>
                    </div>
                    <div className="userinfo-orders">
                        <h1 id='orders'>Orders</h1>
                        { Object.keys(user.orderedItems).length > 0 ?
                        <div className="userinfo-eachorder">
                             {user.orderedItems.map((eachOrder, index) => {
                                return <div className="orderDescription">
                                    <div className={`orderinfo-alldetails ${eachOrder.status==="Delivered"?"accepted":eachOrder.status==="Cancelled"?"declined":"processing"}`}>
                                        <div className="orderinfo-details">
                                            <div className="orderinfo_content"><p>Status:                        </p>{eachOrder.status}</div>
                                            <div className="orderinfo_content"><p>Product ID:                 </p>{eachOrder.orderId}</div>
                                            <div className="orderinfo_content"><p>Product Name:         </p>{eachOrder.items.name}</div>
                                            <div className="orderinfo_content"><p>Product Quantity:    </p>{eachOrder.quantity}</div>
                                            <div className="orderinfo_content"><p>Product Amount:     </p>{eachOrder.amount}</div>
                                            <div className="orderinfo_content"><p>Size:                             </p>{eachOrder.items.size.join(' , ')}</div>
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
                </div> : <>Loading...</>}
            </div>
        </div>
    )
}

export default UserInfo;