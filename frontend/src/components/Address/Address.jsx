import React, { useContext, useEffect, useState } from 'react';
import './Address.css'
import { ShopContext } from '../../context/ShopContext';

const Address = ({changeCurrent}) => {
    const {getUserInfo} = useContext(ShopContext)
    const [addressFormData, setAddressFormData] = useState({                      //Input values storage
        first_name:"",
        middle_name:"",
        last_name:"",
        location: "",
        street: "",
        locality: "",
        city: "",
        state: "",
        pincode: "", 
        mobile_no : ""
    })
    const [err, setErr] = useState({});                     //Identify the Fields that are empty and change color
    const [successfulClick, setSuccessfulClick] = useState(false);
    const [userAdd, setUserAdd] = useState({})

    const fetchUserAdd = async () => {
        setUserAdd(await getUserInfo())
    }

    useEffect(()=>{
        if(successfulClick) {
            fetch(`http://localhost:4000/update-address`,{
                method:"POST",
                headers:{
                    Accept:"Application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"address":addressFormData})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
            setSuccessfulClick(false)
            changeCurrent('payment')
        }
    },[successfulClick])

    useEffect(()=>{
        fetchUserAdd();
    },[])

    useEffect(()=>{
        if(Object.keys(userAdd).length >0 && Object.keys(userAdd.address).length > 0) {
            setAddressFormData((prevData) => ({
                ...prevData,
                first_name: userAdd.address.first_name,
                middle_name: userAdd.address.middle_name,
                last_name: userAdd.address.last_name,
                location: userAdd.address.location,
                street: userAdd.address.street,
                locality: userAdd.address.locality,
                city: userAdd.address.city,
                state: userAdd.address.state,
                pincode: userAdd.address.pincode,
                mobile_no: userAdd.address.mobile_no
            }))
        }
    },[userAdd])

    const handleChange = (e) => {                           //Update the value of input
        if(e.target.name == "mobile_no") {
            var input = document.querySelector('.mobile');
            // Regular expression to match integers
            const integerPattern = /^-?\d*$/;
            if (!integerPattern.test(e.target.value)) {
                // Remove last character if it doesn't match the pattern
                input.value = e.target.value.slice(0, -1);
                return;
            }
        }
        setAddressFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFocus = (e) => {                            //Change color back to normal on focus
        const { name } = e.target;
        setErr((prevErr) => ({
          ...prevErr,
          [name]: false,
        }));
      };

    const handleSubmit = () => {                            //Checking not filled fields
        const requiredFields = ["first_name", "last_name", "location", "street", "locality", "city", "state", "pincode","mobile_no"];
        const newErr = {};
        
        for (const field of requiredFields) {
            if (!addressFormData[field]) {
                newErr[field] = true;
            }
        }
        if (Object.keys(newErr).length > 0) {
            setErr(newErr);
        }
        else {
            setSuccessfulClick(true);
        }
    };

    return(
        <div className="address">
            <div className="address-name">
                <p>Name:</p>
                <div className='name-box'>
                    <div className="coolinput">
                        <label htmlFor="input" className="text">First Name*:</label>
                        <input type="text" placeholder="Enter your First name... " value={addressFormData.first_name} 
                                onChange={handleChange} name="first_name" onFocus={handleFocus} className={`input ${err.first_name ? 'input-error' : 'no-error'}`} />
                    </div>
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Middle Name:</label>
                        <input type="text" placeholder="Enter your Middle name... " value={addressFormData.middle_name}
                                onChange={handleChange} name="middle_name" onFocus={handleFocus} className="input no-error" />
                    </div>
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Last Name*:</label>
                        <input type="text" placeholder="Enter your Last name... " value={addressFormData.last_name}
                                onChange={handleChange} name="last_name"  onFocus={handleFocus} className={`input ${err.last_name === true ? 'input-error' : 'no-error'}`} />
                    </div>
                </div>
            </div>
            <div className="adress-mobile">
                <p>Mobile Number:</p>
                <div className="phone-box">
                    <div className="coolinput">
                        <label htmlFor="input" className="text"></label>
                        <input type="text" placeholder="+91" disabled name="input" className="input mb" />
                    </div>
                    <div className="coolinput mo">
                        <label htmlFor="input" className="text">Mobile Number*:</label>
                        <input type="text" placeholder="Enter your Mobile Number... " value={addressFormData.mobile_no}
                            onChange={handleChange} name="mobile_no" onFocus={handleFocus} className={`input mobile ${err.mobile_no ? 'input-error' : 'no-error'} sr`} />
                    </div>
                </div>
            </div>
            <div className="address-address">
                <p>Adderss:</p>
                <div className="address-box">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Location*:</label>
                        <input type="text" placeholder="Enter your Location... " value={addressFormData.location}
                                onChange={handleChange} name="location" onFocus={handleFocus} className={`input loc ${err.location ? 'input-error' : 'no-error'}`} />
                    </div>
                    <div className="second-row">
                        <div className="coolinput">
                            <label htmlFor="input" className="text">Street Name*:</label>
                            <input type="text" placeholder="Enter your Street... " value={addressFormData.street}
                                onChange={handleChange} name="street" onFocus={handleFocus} className={`input sr ${err.street ? 'input-error' : 'no-error'}`} />
                        </div>
                        <div className="coolinput">
                            <label htmlFor="input" className="text">Locality*:</label>
                            <input type="text" placeholder="Enter your Locality... " value={addressFormData.locality}
                                onChange={handleChange} name="locality" onFocus={handleFocus} className={`input sr ${err.locality ? 'input-error' : 'no-error'}`} />
                        </div>
                    </div>
                    <div className="third-row">
                        <div className="coolinput">
                            <label htmlFor="input" className="text">City*:</label>
                            <input type="text" placeholder="Enter your City... " value={addressFormData.city}
                                    onChange={handleChange} name="city" onFocus={handleFocus} className={`input ${err.city ? 'input-error' : 'no-error'}`} />
                        </div>
                        <div className="coolinput">
                            <label htmlFor="input" className="text">State*:</label>
                            <input type="text" placeholder="Enter your State... " value={addressFormData.state}
                                    onChange={handleChange} name="state" onFocus={handleFocus} className={`input ${err.state ? 'input-error' : 'no-error'}`} />
                        </div>
                        <div className="coolinput">
                            <label htmlFor="input" className="text">Pincode*:</label>
                            <input type="text" placeholder="Enter your PinCode... " value={addressFormData.pincode}
                                    onChange={handleChange} name="pincode" onFocus={handleFocus} className={`input ${err.pincode ? 'input-error' : 'no-error'}`}  />
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={handleSubmit}>
                <button className='address-button'>
                    <span class="circle1"></span>
                    <span class="circle2"></span>
                    <span class="circle3"></span>
                    <span class="circle4"></span>
                    <span class="circle5"></span>
                    <span class="text">Continue</span>
                </button>
            </div>
        </div>
    )
}

export default Address;