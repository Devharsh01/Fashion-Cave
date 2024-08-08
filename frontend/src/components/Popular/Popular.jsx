import React, { useContext, useEffect, useRef } from 'react'
import './Popular.css'
import Item from '../Items/Item.jsx'
import arrow_left from '../Assets/arrow_right2.png'
import arrow_right from '../Assets/arrow_right2.png'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg_image from '../Assets/background_landscape.jpg'
import { useState } from 'react';
import { ShopContext } from '../../context/ShopContext';

const Popular = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    const {all_product} = useContext(ShopContext)

    useEffect(()=>{
      let popularFilter = [...all_product];
      popularFilter = popularFilter.sort((a,b)=> new Date(b.date) - new Date(a.date) )
      let shownPopularProducts = popularFilter.slice(0,4);
      console.log(popularFilter, shownPopularProducts, shownPopularProducts.length)
      setPopularProducts(shownPopularProducts)
    }, [all_product])

    const popularRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      gsap.to('.popular-arrow-left',{
        autoAlpha: 0,
        duration: 0,
      })
    })

    let rightCount = 0;     //Measure the number of right counts
    let maxRightCount = (popularProducts.length-4)/2

    const moveRight = () => {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 2, popularProducts.length - 4));
    };
  
    const moveLeft = () => {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 2, 0));
    };

    return (
        <div className="popular" ref={popularRef}>
            <img className='popular-bg' src={bg_image} alt="" />
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="popular-item" style={{ transform: `translateX(-${currentIndex * 220}px)` }}>
                {popularProducts.map((item,i) =>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
            {/* <div className="arrows">
            <img className= "popular-arrow-left" src={arrow_left} onClick={moveLeft} alt="" />
            <img className= "popular-arrow-right" src={arrow_right} onClick={moveRight} alt="" />
            </div> */}
        </div>
    )
  }

export default Popular