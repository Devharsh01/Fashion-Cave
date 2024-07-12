import React, { useRef, useState } from 'react'
import "./hero.css"
import hero_image from "../Assets/main_page_icon.jpg"
import hero_image2 from "../Assets/main_page_icon22.jpg"
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { TextPlugin } from 'gsap/all';
import { Flip } from 'gsap/all';

/* For displaying the Dashboard of the webpage */
const Hero = () => {
    const textRef = useRef(null);
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(Flip);

    // const [currentImage, setCurrentImage] = useState(0);
    // let images = [hero_image, hero_image2]

    const { contextSafe } = useGSAP({scope: textRef});
    const mouseIn = contextSafe(() => {
        gsap.to("#hero-family", {
                duration: 1, // Adjust duration for typing effect
                text: {
                    value: "the family of ",
                },
                ease: "power3.out", // Adjust ease for typing animation
                color: "red",
                });
        });
    const mouseOut = contextSafe(() => {
        gsap.to("#hero-family", {
            duration: 1, // Adjust duration for typing effect
            text: {
                value: " ",
                rtl: true,      //Text introduced from right-to-left
            },
            ease: "power3.out", // Adjust ease for typing animation
            color: "red",
        });
    });
    // const handleImageClick = () => {
    //     gsap.to('.hero-right-img',{
    //         opacity: 0,
    //         duration: 0.5,
    //         rotateY: '+=90deg',
    //         onComplete: () => {
    //             {currentImage===0 ? setCurrentImage(1) : setCurrentImage(0)}
    //             gsap.to('.hero-right-img',{
    //                 rotateY: '-=90deg',
    //                 opacity: 1,
    //                 duration: 0.5
    //             })
    //         }
    //     })
    // }

    return (
        <div className="hero">
            <div className="hero-left" ref={textRef}>
                <div className='hero-welcome'>
                    <h1>WELCOME</h1>
                </div>
                <p id="hero-para" onMouseEnter={mouseIn} onMouseLeave={mouseOut}>Welcome to<span>&nbsp;</span><span id ="hero-family"></span><span>&nbsp;</span>Fashion Cave!!</p>
                <p id="hero-para">We bring you one of the most amazing dresses all around the world with 100% guarantee of quality and color</p>
                <div className='hero-button'>
                    <button>About Us</button>
                </div>
            </div>
            <div className="hero-right">
                {/* <img className='hero-right-img' onClick={handleImageClick} src={images[currentImage]} alt="" /> */}
                <img className='hero-right-img' src={hero_image} alt="" />
            </div>
        </div>
    )
}

export default Hero