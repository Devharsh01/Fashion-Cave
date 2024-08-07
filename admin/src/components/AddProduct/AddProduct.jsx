import React,{useState} from "react";
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useContext } from "react";
import { AdminContext } from "../../Context/adminContext";

const AddProduct = () =>{
    const {url} = useContext(AdminContext)
    const [image,setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"jewellery",
        new_price:"",
        old_price:"",
        size:[]
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const toggleSizeSelection = (size) => {
        setProductDetails((prevState) => {
          const { size: selectedSizes } = prevState;
          if (selectedSizes.includes(size)) {
            // Remove size from selected sizes
            return {
              ...prevState,
              size: selectedSizes.filter((s) => s !== size)
            };
          } else {
            // Add size to selected sizes
            return {
              ...prevState,
              size: [...selectedSizes, size]
            };
          }
        });
      };

    const Add_product = async ()=>{
        const isEmpty = Object.values(productDetails).some(
            (value) => value === "" || (Array.isArray(value) && value.length === 0));
        if (isEmpty) {
            alert("Please fill out all fields.");
            return;
        }

        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);
        await fetch(`${url}/upload`,{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((res) => res.json()).then((data)=>{responseData=data});

        if(responseData.success)
        {
            product.image = responseData.image_url;
            console.log(product);
            await fetch(`${url}/addproduct`,{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed");
            })
        }
        else {
            alert("Upload image correctly");
        }
    }
    
    return(
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value = {productDetails.name} onChange = {changeHandler} type="text" name="name" placeholder="Type here"/>
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input type="text" value = {productDetails.old_price} onChange = {changeHandler} name="old_price" placeholder="Type Here" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type="text" value = {productDetails.new_price} onChange = {changeHandler} name="new_price" placeholder="Type Here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Produt Category</p>
                <select name="category" value = {productDetails.category} onChange = {changeHandler} className="add-product-selector" placeholder='Select Category'>
                    <option value="jewellery">Jewellery</option>
                    <option value="dresses">Dresses</option>
                    <option value="saree">Saree</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Available Product Size</p>
                <div className="size">
                    <div className={`sizeS ${productDetails.size.includes('S') ? "selected" : ""}`} onClick={()=>{toggleSizeSelection('S')}} >S</div>
                    <div className={`sizeM ${productDetails.size.includes('M') ? "selected" : ""}`} onClick={()=>{toggleSizeSelection('M')}} >M</div>
                    <div className={`sizeL ${productDetails.size.includes('L') ? "selected" : ""}`} onClick={()=>{toggleSizeSelection('L')}} >L</div>
                    <div className={`sizeXL ${productDetails.size.includes('XL') ? "selected" : ""}`} onClick={()=>{toggleSizeSelection('XL')}} >XL</div>
                    <div className={`sizeXXL ${productDetails.size.includes('XXL') ? "selected" : ""}`} onClick={()=>{toggleSizeSelection('XXL')}} >XXL</div>
                </div>
            </div>
            <div className="addproduct-itemfield imageInput">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
            </div>
            <button onClick={()=>{Add_product()}} className='addproduct-btn' >ADD</button>
        </div>
    )
}

export default AddProduct;