/*Login Signup page page of the window */
import React, { useEffect, useContext } from 'react'
import './CSS/LoginSignUp.css'
import { useState } from 'react'
import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';
import CloseIcon from '../components/Assets/closeIcon';
import { ShopContext } from '../context/ShopContext';

const LoginSignUp = ({setLogin}) => {
    gsap.registerPlugin(TextPlugin);
    
    const {gettingCart} = useContext(ShopContext)
    const [key, setKey] = useState(0);
    const [state,setState] = useState("Login");                     //Check if login or sign-up
    const [inputState, setInputState] = useState("email")           //Check input element 
    const [isChecked, setIsChecked] = useState(false)               //Check if checkbox is checked or not
    const [isShown, setIsShown] = useState(false)                   //Check if password is shown or not
    const [isforgotten, setIsForgotten] = useState(false)           //Check if forgotten or not
    const [formData, setFormData] = useState({                      //Input values storage
        name:"",
        password:"",
        email:"" 
    })

    useEffect(()=>{
        let tl = gsap.timeline();
        tl.to(".headline-change", {
            duration: 0.5,
            color: 'red',
            text: { 
                value: " ", 
                rtl: true,
            }, 
            ease: "power3.inout"
        }).to(".headline-change", {
            duration: 0.5, // Adjust duration for typing effect
            color: 'green',
            text: {
                value: `${inputState}`,
            },
            ease: "power3.inout", // Adjust ease for typing animation
            onComplete: () => {
                gsap.to(".headline-change",{ color: "black"})
            }
        });

        setFormData(prevState => ({                 //To empty the Input tag each time
            ...prevState,
            [inputState]: '' // Clear the current inputState value
        }));

        gsap.to(".userDisplay",{
            duration: 0.5,
            color: '#2c2c2c',
            text: { 
                value: `Name: ${formData['name']}`,
            }, 
            ease: "power3.inout"
        })

        gsap.to(".emailDisplay",{
            duration: 0.5,
            color: '#2c2c2c',
            text: { 
                value: `Email: ${formData['email']}`, 
            }, 
            ease: "power3.inout"
        })
    },[inputState])

    useEffect(()=>{
        setIsForgotten(false);
    },[state])

    const changeHandler = (e) =>{
        setFormData(prevFormData => ({...prevFormData, [e.target.name]:e.target.value}))
    }

    const handleCheck = (props) =>{                      //Shake Checkbox if not checked
        if(formData[props] !== ''){
            var element = document.querySelector("#myCheckbox")
        }
        else{
            var element = document.querySelector("#loginData")    
        }
        element.classList.add("shake")
        setTimeout(()=>{
            element.classList.remove("shake")
        },300)
    }

    const login = async () => {
        console.log("Login function executed",formData)
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData = data)
        
        setInputState("email")
        if(responseData.success){
            //Used to store the authentication token on the client device for constant authentication
            localStorage.setItem('auth-token',responseData.token);
            gettingCart();
            setLogin(false);  
        }
        else{
            alert(responseData.errors);
        }
        
    }
    
    const signup = async () => {
        console.log("SignUP function executed",formData)
        setInputState("email")
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData = data)
        
        if(responseData.success){
            //Used to store the authentication token on the client device for constant authentication
            localStorage.setItem('auth-token',responseData.token);
            setLogin(false);  
        }
        else{
            alert(responseData.errors)
        }
    }

    const forgot = async () => {
        console.log("Forgot Function Called",formData['email']);
        let responseData;
        await fetch('http://localhost:4000/forgotPassword',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData = data)
        
        if(responseData.success){
            //Used to store the authentication token on the client device for constant authentication
            alert("Reset Link Sent");
            setLogin(false);  
        }
        else{
            alert(responseData.errors)
        }
    }

    return (
        <div className='loginsignup' key={key}>
            <div className="loginsignup-container">

                <div className="loginsignup-container-left">
                    <h1>{state}</h1>
                    {state==="Sign Up"? <p name className="loginsignup-login"> Already have an account? 
                                            <span onClick={()=>{setInputState("email") ;setState("Login")}}>Login Here</span> </p> :
                                        <p className="loginsignup-login">Create an account? 
                                            <span onClick={()=>{setInputState("name") ;setState("Sign Up")}}>&nbsp;Click Here</span></p>}
                    {state==="Sign Up" ? 
                    <div className="loginsignup-agree">
                        <input type="checkbox" id='myCheckbox' checked={isChecked} onChange={()=>{setIsChecked(!isChecked)}} />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div> : 
                    <div className="loginsignup-forgot" onClick={()=>{setInputState("email"); setIsForgotten(true)}}>Forgot Password?</div>
                    }
                </div>

                <div className="closeicon" onClick={()=>{setLogin(false)}}><CloseIcon  /></div>

                <div className="loginsignup-container-right">
                    <div className="loginsignup-fields">
                        <h2 className='loginsignup-headline'>Enter your <span className='headline-change'>email</span></h2>
                        {state==="Sign Up" && inputState!=="name"? <p className='userDisplay'></p> :<></>}
                        {inputState==="password"? <p className='emailDisplay'></p> :<></>}
                        {/* {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>} */}
                        <input id="loginData" name={inputState} 
                               value={formData[inputState]} 
                               onChange={changeHandler} 
                               type={inputState==="name"?"text":inputState}
                               placeholder={inputState==="email"?'Your Email Address':inputState==="password"?"Your Password":'Your Name'}
                        />
                        {isShown?<p className='shown'>&nbsp;&nbsp;&nbsp;&nbsp;{formData["password"]}</p>:<></>}
                        {/* <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' /> */}
                    </div>
                    
                    {inputState==="password"?
                    <div className="loginsignup-show">
                        <input type="checkbox" id='showPassword' checked={isShown} onChange={()=>{setIsShown(!isShown)}} />
                        <p>Show Password</p>
                    </div>
                    :<></>}
                    <button onClick={()=>{formData[inputState]==='' ? 
                        handleCheck(inputState): isforgotten ? <></> : inputState==="email" ? 
                        setInputState("password"):inputState==="name" ? setInputState("email"):<></>;
                        formData[inputState]!=='' ? isforgotten ? forgot() : 
                        inputState!=="password" ? <></> :
                        state==="Login" ? login() : 
                        isChecked ? signup() : handleCheck(inputState) :
                        handleCheck(inputState)}}>
    
                    {inputState==="password"?"Submit":"Continue"}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default LoginSignUp