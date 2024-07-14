import React, { useEffect, useState } from "react";
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { useContext } from "react";
import { AdminContext} from "../../Context/adminContext";

const ListProduct = () =>{

    const {url} = useContext(AdminContext)
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () =>{
        await fetch(`${url}/allproducts`)
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
        console.log("Info Fetched")
    }

    useEffect(()=>{
        console.log("All products", allproducts, allproducts.length)
    },[allproducts])

    useEffect(() => {
        fetchInfo();
        console.log("Fetching Info")
    },[])

    const remove_product = async (id) =>{
        await fetch(`${url}/removeproduct`,{
            method:"POST",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }
    return(
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <div className="listproduct-product-old_price listproduct-product-title">
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
                </div>
            </div>
            <div className="listproduct-allproduct">
                <hr />
                {allproducts.map((product,index)=>{
                    return <><div key = {index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <div className="listproduct-product-old_price">
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={()=>{remove_product(product.id)}} className= 'listproduct-remove-icon' src={cross_icon} alt="" />
                        </div>
                    </div>
                    <hr/>
                    </>

                })} 
            </div>
        </div>
    )
}

export default ListProduct;