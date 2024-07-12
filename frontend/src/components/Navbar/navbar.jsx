import React, { useContext, useState, useRef, useEffect } from 'react'
import './navbar.css'

//Importing the logos from the Assets folder
import logo from '../Assets/logo_small1.jpg'
import cart_icon from '../Assets/cart-icon.jpg'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.jpg'
import gsap from 'gsap'
import UserIcon from '../Assets/UserIcon'

const Navbar = ({setLogin, setShowCart}) => {

    const [menu,setMenu] = useState("");            //menu identification
    const [searchData, setSearchData] = useState("")    //Search Input 
    const [searchBar, setSearchBar] = useState("nothing")       //Search Bar Visibility
    const [item, setItem] = useState("")                //Underline Hover
    const [dropdownHover, setDropdownHover] = useState(false);      //DropDown Menu Visibility
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();
    const location = useLocation().pathname;

    useEffect(()=>{
        search()
        setMenu('shop');
        console.log(location)
    },[])

    useEffect(()=>{
        gsap.to("#shop", { autoAlpha: menu !== "shop" ? 0 : 1 });
        gsap.to("#jewellery", { autoAlpha: menu !== "jewellery" ? 0 : 1 });
        gsap.to("#dresses", { autoAlpha: menu !== "dresses" ? 0 : 1 });
        gsap.to("#sarees", { autoAlpha: menu !== "sarees" ? 0 : 1 });
    },[menu])

    useEffect(()=>{
        gsap.to("#shop", { autoAlpha: item !== "shop" ? 0 : 1 });
        gsap.to("#jewellery", { autoAlpha: item !== "jewellery" ? 0 : 1 });
        gsap.to("#dresses", { autoAlpha: item !== "dresses" ? 0 : 1 });
        gsap.to("#sarees", { autoAlpha: item !== "sarees" ? 0 : 1 });
    },[item])

    const dropdown_toggle = (e) => {                    //Setting Dropdown Toggle
        menuRef.current.classList.toggle("nav-menu-visible");
        {dropdownHover===true?setDropdownHover(false):setDropdownHover(true)};
    }
    const press_toggle = (e) =>{            //Changing DropDown Visibility
        if(menuRef.current.classList.contains("nav-menu-visible")){
            dropdown_toggle();
        }
    }

    const search = () => {              //Search Operation
        {searchBar === 0 ? gsap.to('.nav-searchInput',{
            duration: 0.5,
            autoAlpha: 1,
            width: 150,
            onComplete: () => {
                setSearchBar(1)
            }
        }): gsap.to('.nav-searchInput', {
            duration: 0.5,
            autoAlpha: 0,
            width: 0,
            onComplete: () => {
                setSearchBar(0)
            }
        })}
    }

    document.addEventListener('scroll', ()=>{
        const nav = document.querySelector('#navbar');
        // nav.classList.toggle("scrolled", window.scrollY> 0)
        if(window.scrollY > 0 && !nav.classList.contains('scrolled')){
            nav.classList.add('scrolled')
        }
        else if(window.scrollY === 0 && nav.classList.contains('scrolled')){
            nav.classList.remove('scrolled')
       }

    })
    return (
        <div className = 'navbar' id="navbar">
            
            <div className='nav-logo'>
                {/*Displaying the logo*/}
                <Link onClick={()=>{setMenu("shop")}} to='/' ><img src={logo}  id="nav-logo-id" alt="" /></Link>
            </div>
            <div className="nav-dropdown" onClick= {dropdown_toggle} src={nav_dropdown} >
                {dropdownHover===false?<svg width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="black" stroke='white' strokeWidth="2"/>  
                <path d="M8 12l6 6 0-12z" fill="white" /></svg>:
                <svg width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="white" stroke='black' strokeWidth="2"/>  
                <path d="M16 12l-6-6 0 12z" fill="black" /></svg>}
            </div>
            {/*<img className='nav-dropdown' onClick= {dropdown_toggle} src={nav_dropdown} ref={openRef} alt="" />*/}
            <ul className='nav-menu' ref={menuRef} >
                {/*Displaying the menu*/}
                <li><Link onMouseEnter={() => {setItem('shop')}} onMouseLeave={()=>{setItem(menu)}} onClick={()=>{setMenu("shop"); press_toggle()}} style={{textDecoration: 'none', color:"#cdcecc"}} to='/'>Shop</Link><h id="shop"/></li>
                <li><Link onMouseEnter={() => {setItem('jewellery')}} onMouseLeave={()=>{setItem(menu)}} onClick={()=>{setMenu("jewellery"); press_toggle()}} style={{textDecoration: 'none', color:"#cdcecc"}} to='/jewellery'>Jewellery</Link><h id="jewellery"/></li>
                <li><Link onMouseEnter={() => {setItem('sarees')}} onMouseLeave={()=>{setItem(menu)}} onClick={()=>{setMenu("sarees"); press_toggle()}} style={{textDecoration: 'none', color:"#cdcecc"}} to ='/sarees'>Sarees</Link><h id="sarees"/></li>
                <li><Link onMouseEnter={() => {setItem('dresses')}} onMouseLeave={()=>{setItem(menu)}} onClick={()=>{setMenu("dresses"); press_toggle()}} style={{textDecoration: 'none', color:"#cdcecc"}} to ='/dresses'>Dresses</Link><h id="dresses"/></li>                
            </ul>
            {/* <input type="text" className='nav-searchInput' onChange={e => setSearchData(e.target.value)} placeholder='Search Here...' /> */}
            <div className="nav-login-cart">
                {/* Displaying the search Icon */}
                {/* <lord-icon
                    src="https://cdn.lordicon.com/kkvxgpti.json"
                    trigger="hover"
                    onClick={search}
                    colors="primary:#CFCCCC"> 
                </lord-icon> */}
                {/*Displaying the login button*/}
                {/* {localStorage.getItem('auth-token')? <div className='userDetails'><UserIcon/></div>: <></>} */}
                {localStorage.getItem('auth-token')?
                <button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}><h5>Logout</h5><div className="black"></div></button>:
                <Link id='loginButton' onClick={()=>{setMenu("nothing"); setLogin(true)}} ><button><h5>Login</h5><div className="black"></div></button></Link>}
                <Link className='nav-login-cart-img' onClick={()=>{setMenu("nothing"); {location==="/cart"?<></>:setShowCart(true)}}}><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar