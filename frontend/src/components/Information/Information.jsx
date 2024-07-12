import React, { useEffect } from 'react'
import './Information.css'
import about_us from '../Assets/about_us_bg.jpeg'
import aim_bg from '../Assets/aim_bg.png'
import stores_bg from '../Assets/stores_bg.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Information = () => {
    useEffect(()=>{
        window.addEventListener('scroll',reveal);
    })

    const reveal = () => {
        var element = document.querySelector('#information');
        if(element !== null){
            var windowHeight = window.innerHeight;
            var revealTop = element.getBoundingClientRect().top;
            var revealPoint = 100;

            if(revealTop < windowHeight - revealPoint){
                element.classList.add('active');
            }
            else{
                element.classList.remove('active');
            }
        }
    }

    const informationLeftUP = () =>{            /* Hover event Handler */
        const element = document.querySelector("#left")
        element.classList.toggle("hovered")
    }
    const informationMiddleUP = () =>{            /* Hover event Handler */
        const element = document.querySelector("#middle")
        element.classList.toggle("hovered")
    }
    const informationRightUP = () =>{            /* Hover event Handler */
        const element = document.querySelector("#right")
        element.classList.toggle("hovered")
    }

    return (
        <div className="information" id="information">
            <div className="informationLeft" id="left" onMouseEnter={informationLeftUP} onMouseLeave={informationLeftUP}>
                <img src={aim_bg} alt="" />
                <h1>Our Aim</h1>
            </div>
            <div className="informationMiddle" id="middle" onMouseEnter={informationMiddleUP} onMouseLeave={informationMiddleUP}>
                <img src={about_us} alt="" />
                <h1>About Us</h1>
            </div>
            <div className="informationRight" id="right" onMouseEnter={informationRightUP} onMouseLeave={informationRightUP}>
                <img src={stores_bg} alt="" />
                <h1>Stores</h1>
            </div>
        </div>
    )
}

export default Information