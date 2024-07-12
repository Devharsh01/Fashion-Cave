import React, { useEffect, useRef } from 'react'
import './Popular.css'
import Item from '../Items/Item.jsx'
import arrow_left from '../Assets/arrow_right2.png'
import arrow_right from '../Assets/arrow_right2.png'
import p1_img from "../Assets/product_1.png";
import p2_img from "../Assets/product_2.png";
import p3_img from "../Assets/product_3.png";
import p4_img from "../Assets/product_4.png";
import p5_img from "../Assets/product_5.png";
import p6_img from "../Assets/product_6.png";
import p7_img from "../Assets/product_7.png";
import p8_img from "../Assets/product_8.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg_image from '../Assets/background_landscape.jpg'
import { useState } from 'react';

const Popular = () => {
  // const [popularProducts, setPopularProducts] = useState([]);

    // useEffect(()=>{
      //     fetch('http://localhost:4000/popularinwomen')
    //     .then((response)=>response.json()).then((data)=>setPopularProducts(data));
    // }, [])

    const popularRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      gsap.to('.popular-arrow-left',{
        autoAlpha: 0,
        duration: 0,
      })
    })

    const popularProducts = [{
          id: 1,
          name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
          category: "sarees",
          image: p1_img,
          new_price: 50.0,
          old_price: 80.5,
        },
        {
          id: 2,
          name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
          category: "sarees",
          image: p2_img,
          new_price: 85.0,
          old_price: 120.5,
        },
        {
          id: 3,
          name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
          category: "sarees",
          image: p3_img,
          new_price: 60.0,
          old_price: 100.5,
        },
        {
          id: 4,
          name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
          category: "sarees",
          image: p4_img,
          new_price: 100.0,
          old_price: 150.0,
        }]
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