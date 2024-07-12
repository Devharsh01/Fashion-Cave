/*Home page of the window */
import React from 'react'
import './CSS/shop.css'
import Hero from '../components/Hero/hero'
import Popular from "../components/Popular/Popular.jsx";
import Offers from '../components/Offers/Offers'
import Information from '../components/Information/Information.jsx';

const Shop = () => {
    return (
        <div className='shop'>
            <Hero/>
            <Popular/>
            <Offers/>
            <Information/>
        </div>
    )
}


export default Shop