import React, { useEffect, useRef, useState } from 'react'
import './Offers.css'
import box from '../Assets/box_withoutbg.png'
import lid from '../Assets/lid_withoutbg.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {Player} from '@lordicon/react'

const ICON = require('../Assets/crackers.json')

const Offers = () => {
    const offersRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    gsap.registerPlugin(ScrollTrigger)

    const playerRef = useRef(null);
    const playerRef1 = useRef(null);
    const Triangle = ({ size, color1, color2 }) => {
        return (
          <svg width={3*size} height={2*size}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color1} />
                <stop offset="100%" stopColor={color2} />
              </linearGradient>
            </defs>
            <polygon points={`0,${size} ${3*size},0 ${3*size},${2*size}`} fill={`url(#gradient)`} />
          </svg>
        );
    };

    useEffect(()=>{
        if(isVisible) {
            playerRef.current?.playFromBeginning();
            playerRef1.current?.playFromBeginning();
        }
    },[isVisible])

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
            else {
                setIsVisible(false)
            }
        },
        {
            threshold: 0.5, // Trigger when 10% of the element is visible
        }
        );
        if (offersRef.current) {
            observer.observe(offersRef.current);
        }
        //CleanUP the observer on component unmount
        return () => {
            if (offersRef.current) {
                observer.unobserve(offersRef.current);
            }
        };
    },[]) 

    return (
        <div className='offers' ref={offersRef}>
            <div className={`offers-image ${isVisible? "scroll-reveal-horizontal":""}`}>
                <div className="giftbox">
                    <img className='offers-lid' src={lid} alt="" />
                    <img className={`offers-box ${isVisible? "scroll-reveal":""}`} src={box} alt="" /> 
                </div>
                <div className={`offers-cracker ${isVisible? "show":""}`}>
                    <div className="offers-cracker-left">
                        <Player
                            ref={playerRef}
                            size={125}
                            icon = {ICON}
                        />
                    </div>
                    <div className="offers-cracker-right">
                        <Player
                            className="offers-crackers"
                            ref={playerRef1}
                            size={125}
                            icon = {ICON}
                        />
                    </div>
                </div>
            </div>
            <div className={`offers-reveal ${isVisible? "show":""}`}>
                <Triangle size={200} color1="#22588a" color2="#000" />
            </div>  
            <div className={`offers-left ${isVisible? "show":""}`}>
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>CHECK NOW</button>
            </div>
        </div>
    )
}

export default Offers