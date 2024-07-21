import React, { useEffect, useRef } from "react";
import './Preloader.css'
import logo from '../Assets/logo_small1.jpg'
import black_screen from '../Assets/black_screen.jpg'
import gsap from 'gsap';

const Preloader = () => {
    const preloaderRef = useRef(null);
    useEffect(() => {
        let originalLogo = document.getElementById('nav-logo-id')
        let goingLogo = document.getElementById('logo')
        let ctx = gsap.context(() => {
            let tl = gsap.timeline();
            let originalLogoDim = originalLogo.getBoundingClientRect();
            console.log(originalLogoDim)
            tl.eventCallback("onStart", disableScroll)          //Disable Scroll opearation
            .to(".preloader-logo",{
            width: originalLogoDim.width,
            height: originalLogoDim.height,
            duration: 0,
            delay: 0,
        })
        let goingLogoDim = goingLogo.getBoundingClientRect();
        console.log(goingLogoDim)
        tl.to(".preloader-logo",{
            opacity: 1,
            duration: 1.2,
            delay: 0.5,
        }).to(".preloader-logo",{
            x: originalLogoDim.x - goingLogoDim.x,
            y: originalLogoDim.y - goingLogoDim.y, 
            
            duration: 1.2,
            ease: "power2.inout"
        }).to(".preloader-screen",{
            opacity: 0,
            x: "+=50",
            duration: 1
        }).to([".preloader-screen",".preloader-logo", ".preloader"],{
            autoAlpha: 0,
            duration: 1
        })
        .eventCallback("onComplete", enableScroll)
        goingLogoDim = goingLogo.getBoundingClientRect();
        console.log(goingLogoDim)
    }, preloaderRef)

        return () => ctx.revert();
    }, [])

    function disableScroll() {
        document.body.classList.add('no-scroll');
    }
    function enableScroll() {
       document.body.classList.remove('no-scroll');
    }

    return(
        <div className="preloader" ref={preloaderRef}>
            <img className="preloader-screen" src={black_screen} alt="" />
            <img className="preloader-logo" src={logo} id = 'logo' alt="" />
        </div>
    )
}

export default Preloader;

























/*

    useLayoutEffect(() => {
        let el = document.getElementById('nav-logo-id')
        let elCenter = document.getElementById('centerLogo')
        let ctx = gsap.context(() => {
                const t1 = gsap.timeline();
                let elCordinates = el.getBoundingClientRect()
                let elCenterCordinates = elCenter.getBoundingClientRect()
                console.log(elCordinates)
                console.log(elCenterCordinates)

                t1.eventCallback("onStart", disableScroll)          //Disable Scroll opearation
                  .from(["#centerLogo"], {                    //Fly in animation
                    opacity:0,
                    duration: 1.5,
                    delay: 0 // No delay needed
                }).to(["#centerLogo"], {                      //Fly out animation
                    x: elCordinates.x-elCenterCordinates.x,
                    y: elCordinates.y-elCenterCordinates.y,
                    width: elCordinates.width,
                    height: elCordinates.height,
                    duration: 1.5,
                    delay: 0,
                    ease: "power3.out"
                }).to("#black_screen",{                         //Background appear 
                    opacity:0,
                    y:"+=30",
                    duration:0.7,
                }).to(["#black_screen","#centerLogo"],{            
                    duration:1,
                    autoAlpha:0,
                }).eventCallback("onComplete", enableScroll);           //Scroll function enables
        }, iconRef)
        
        return () => ctx.revert()
    },[])

    function disableScroll() {
        document.body.classList.add('no-scroll');
    }
    function enableScroll() {
       document.body.classList.remove('no-scroll');
    }

    return(
        <div className="preloader" ref={iconRef}>
            <img src={black_screen} className="preloader-black" id="black_screen"alt="" />
            <img src={logo} classname="preloader-logo" id="centerLogo" alt="" />
        </div>
    )
}

export default Preloader;
*/

/*
    const fashionRef = useRef();
    const caveRef = useRef();
    const iconRef = useRef(null);

    useLayoutEffect(() => {
        let el = document.getElementById('nav-logo-id')
        let elCenter = document.getElementById('centerLogo')
        let elFashion = document.getElementById('fashion')
        let elCave = document.getElementById('cave')
        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();
            mm.add({                                               //Difference devices
                isMobile: "(max-width: 500px)",
                isTablet: "(max-width: 800px) and (min-width:500px)",
                isSmallLaptop: "(max-width: 1024px) and (min-width:800px)",
                isLaptop: "(max-width: 1280px) and (min-width:1024px)",
                isScreen: "(max-width: 2400px) and (min-width:1280px)"
            }, (context) => {
                let {isMobile, isTablet, isSmallLaptop, isLaptop, isScreen} = context.conditions;
                const t1 = gsap.timeline();
                let elCordinates = el.getBoundingClientRect()
                /*let elFashionCordinates = elFashion.getBoundingClientRect()
                let elCaveCordinates = elCave.getBoundingClientRect()
                console.log(elCordinates)
                console.log(elFashionCordinates)
                console.log(elCaveCordinates)
                console.log(elCordinates.x - elFashionCordinates.x + (elCordinates.x * 0.53))
                console.log(elCordinates.x - elCaveCordinates.x)
                console.log(elCordinates.y - elFashionCordinates.y);
                console.log(elCordinates.y - elCaveCordinates.y);
                t1.eventCallback("onStart", disableScroll)          //Disable Scroll opearation
                  .from(["#fashion", "#cave"], {                    //Fly in animation
                    //xPercent: (i, target) => target.id === "fashion" ? 70 : -70,// Dynamic xPercent
                    duration: 2,
                    delay: 0 // No delay needed
                }).to(["#fashion", "#cave"], {                      //Fly out animation
                    /*x: (i,target) => target.id === "fashion" ? elCordinates.left - elFashionCordinates.left + (elCordinates.left * 0.53) - 12:  elCordinates.left - (elCordinates.left * 0.53) - elCaveCordinates.left+ 10,
                    y: (i,target) => target.id === "fashion" ? elCordinates.top - elFashionCordinates.top - 12: elCordinates.top - elFashionCordinates.top+ 10,

                    duration: 1.5,
                    delay: 0,
                    /*width: (i, target) => target.id === "fashion" ? elCordinates.width * 0.33 : elCordinates.width,
                    height: (i, target) => target.id === "fashion" ? elCordinates.height * 0.22 : elCordinates.height,

                    ease: "power3.out"
                }).to("#black_screen",{                         //Background appear 
                    opacity:0,
                    y:"+=30",
                    duration:0.7,
                }).to(["#fashion","#black_screen","#cave"],{            
                    duration:1,
                    autoAlpha:0,
                }).eventCallback("onComplete", enableScroll);           //Scroll function enables
            })
        }, iconRef)
        
        return () => ctx.revert()
    },[])
 */