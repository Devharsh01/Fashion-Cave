import './App.css';
import Navbar from './components/Navbar/navbar'
import Shop from './pages/shop.jsx'
import React, { useEffect, useState } from "react";
import ShopCategory from './pages/shopCategory.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import LoginSignUp from './pages/loginSignUp.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx';
import men_banner from './components/Assets/banner_jewellery1.png'
import women_banner from './components/Assets/banner_saree.png'
import kids_banner from './components/Assets/banner_dress.png'
import Preloader from './components/Preloader/Preloader.jsx'
import CartItems from './components/CartItems/CartItems.jsx'
import Checkout from './pages/Checkout.jsx';
import UserInfo from './components/UserInfo/UserInfo.jsx';

function App() {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false)
  return (
    <div className={`App ${showCart? "no-scrolling":""}`}>
      <BrowserRouter>
      <Preloader/>
      {showLogin?<LoginSignUp setLogin={setShowLogin}/>:<></>}
      {showCart? <CartItems showCart={showCart} setShowCart={setShowCart} />:<></>}
      <Navbar setLogin={setShowLogin} setShowCart={setShowCart}/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/jewellery' element={<ShopCategory  banner = {men_banner} category="jewellery"/>}/>
        <Route path='/sarees' element={<ShopCategory banner = {women_banner} category="saree"/>}/>
        <Route path='/dresses' element={<ShopCategory banner = {kids_banner} category="dresses"/>}/>
        <Route path="/product/:productId" element={<Product/>}>
        </Route>  
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/userinfo' element={<UserInfo/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;