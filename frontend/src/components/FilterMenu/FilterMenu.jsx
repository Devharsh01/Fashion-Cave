import React, {useEffect, useState, useContext} from "react";
import './FilterMenu.css'
import { ShopContext } from "../../context/ShopContext";

const FilterMenu = () => {
    const {setRange, setCheckedSizes} = useContext(ShopContext);

    function validateInput() {
        var input = document.querySelector('#price-min');
        var value = input.value;

        // Regular expression to match integers
        const integerPattern = /^-?\d*$/;

        if (!integerPattern.test(value)) {
            // Remove last character if it doesn't match the pattern
            input.value = value.slice(0, -1);
        }
        else{
            if (value !== "" ) {
                setRange((prevRange) => ({
                    ...prevRange,
                    min: parseInt(value, 10) 
                }));
            }
            else {
                setRange((prevRange) => ({
                    ...prevRange,
                    min: 0 
                }));
            }
        }

        //For Max price
        input = document.querySelector('#price-max');
        value = input.value;

        if(!integerPattern.test(value)) {
            // Remove last character if it doesn't match the pattern
            input.value = value.slice(0, -1);
        }
        else{
            if (value !== "" ) {
                setRange((prevRange) => ({
                    ...prevRange,
                    max: parseInt(value, 10)
                }));
            }
            else {
                setRange((prevRange) => ({
                    ...prevRange,
                    max: 5000 
                }));
            }
        }
    }

    const checkBoxes = (event) =>{
        const { id, checked } = event.target;
        setCheckedSizes((prevCheckedSizes) => {
            if (checked) {
                // If the checkbox is checked, add the id to the list
                return [...prevCheckedSizes, id];
            } else {
                // If the checkbox is unchecked, remove the id from the list
                return prevCheckedSizes.filter((name) => name !== id);
            }
        });
    }

    return(
    <div className="filtermenu">
        <h3>Price Range</h3>
        <div className='prices'>
            <input type="text" className='shopcategory-price' id='price-min' onChange={()=>{validateInput()}} placeholder='Min-value..' /> &nbsp;-&nbsp; <input type="text" className='shopcategory-price' id='price-max' onChange={()=>{validateInput()}} placeholder='Max-Value...' />
        </div>
        <h3>Size</h3>
        <div className='sizes'>
            <div className="S">
                <input id="S" type="checkbox" onChange={checkBoxes} />
                <label for="S">Small</label>
            </div>
            <div className="M">
                <input id="M" type="checkbox" onChange={checkBoxes} />
                <label for="M">Medium</label>
            </div>
            <div className="L">
                <input id="L" type="checkbox" onChange={checkBoxes} />
                <label for="L">Large</label>
            </div>
            <div className="XL">
                <input id="XL" type="checkbox" onChange={checkBoxes} />
                <label for="XL">XL</label>
            </div>
            <div className="XXL">
                <input id="XXL" type="checkbox" onChange={checkBoxes} />
                <label for="XXL">XXL</label>
            </div>
        </div>
    </div>
    )}

export default FilterMenu;