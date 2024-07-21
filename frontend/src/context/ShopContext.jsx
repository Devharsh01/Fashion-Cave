import React, { createContext, useState, useEffect} from "react";
export const ShopContext = createContext();
let port = 4000;

const ShopContextProvider = (props) => {
    const [all_product,setAll_Product] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allPromos,setAllPromos] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [range, setRange] = useState({min: 0, max: 5000})
    const [checkedSizes, setCheckedSizes] = useState([]);
    const [product, setProduct] = useState([]);
    const [promoCode, setPromoCode] = useState(0);

    //http://localhost:4000
    let url = `https://fashion-cave-backend.onrender.com`

    //For the first rendering of products on the webpage
    useEffect(()=>{
        fetch(`${url}/allproducts`).then((response)=>response.json())   
        .then((data)=>{setAll_Product(data);setFilteredProducts(data)});
        
        fetch(`${url}/allpromos`).then((response)=>response.json())
        .then((data)=>setAllPromos(data));

        //GET CART ITEMS FOR EACH USER
        gettingCart()
    },[])
    
    //Filter Out the data on the Filter conditions
    useEffect(()=>{
        let filtered = all_product.filter((product) => product.new_price >= range.min && product.new_price <= range.max);
        if(checkedSizes.length !== 0){
            const new_filtered = filtered.filter((product) => {return checkedSizes.some(sizes => product.size.includes(sizes))});
            setFilteredProducts(new_filtered);
        }
        else{
            setFilteredProducts(filtered);
        }
    },[range,checkedSizes])

    /* Used to add items into the cart */
    const addToCart = (itemId,selected) => {
        setCartItems((prev) => {
            const existingItems = prev[itemId] || [];
            return{
                ...prev, 
                [itemId]:[...existingItems, selected]
            }
        })
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/addtocart`,{
                method:"POST",
                headers:{
                    Accept:"Application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId, "size":selected})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }
    
    /* Used to remove items from the cart */
    const removeFromCart = (itemId,selected) => {
        setCartItems((prev) => {
            const existingItems = prev[itemId] || [];
            if(existingItems.length>0) {
                const index = existingItems.indexOf(selected);
                if(index>-1) {
                    existingItems.splice(index,1);
                }
                if(existingItems.length === 0) {
                    const { [itemId]: removed, ...rest}= prev;
                    return rest;
                }
                return {
                    ...prev,
                    [itemId]: existingItems
                }
            };
            return prev
        })
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/removefromcart`,{
                method:"POST",
                headers:{
                    Accept:"Application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId,"size":selected})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            let itemInfo = all_product.find((product)=>product.id===Number(item))
            if(itemInfo) {
                totalAmount += itemInfo.new_price * cartItems[item].length;
            }
        }
        totalAmount -= ((totalAmount*promoCode)/100);
        return totalAmount;
    }
    
    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item])
                totalItem+= cartItems[item].length;
        }
        return totalItem;
    }

    const gettingCart = () => {
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/getcart`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },  
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    }

    const getProduct = (productId) => {
        fetch(`${url}/product/${productId}`).then((response)=>response.json())
        .then((data)=>{setProduct(data)});
    }

    const fetchProductDetails = async (productId) => {
      try {
        const response = await fetch(`${url}/product/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
      }
    };

    const getOrderProducts = async () => {
        const orderDataPromises = [];
        for (const productId in cartItems) {
            if (cartItems[productId]) {
                const productDetailsPromise = fetchProductDetails(productId).then(product => ({
                    ...product,
                    size: cartItems[productId],
                    quantity: cartItems[productId].length
                }));
                orderDataPromises.push(productDetailsPromise);
            }
        }
        const orderDataFinal = await Promise.all(orderDataPromises);
        // setOrderData(orderDataFinal)
        // console.log("OrderData",orderData,"Final", orderDataFinal)
        return orderDataFinal
    }

    const getUserInfo = async () => {
        if(localStorage.getItem('auth-token')){
            let response = await fetch(`${url}/userDetails`,{
                method:"POST",
                headers:{
                    Accept:"Application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({}),
            })
            let responseF = await response.json();
            if(responseF.success){
                return responseF.user;
            }
        }
    }

    const contextValue = {getTotalCartItems, all_product, cartItems,  addToCart, removeFromCart, getTotalCartAmount, allPromos, setRange, filteredProducts, setCheckedSizes, getProduct, product, gettingCart, promoCode, getOrderProducts, setPromoCode, url, getUserInfo};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
