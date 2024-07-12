/*products page of the window*/
import React, { useContext, useState} from 'react'
import { ShopContext } from '../context/ShopContext';
// import all_product from '../components/Assets/all_product.js';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay.jsx';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox.jsx';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts.jsx';

const Product = () => {
    // const [product, setProduct] = useState([])
    
    // const product = all_product.find((e) => e.id === Number(productId))
    return (
        <div>
            <ProductDisplay/>
            <DescriptionBox/>
            <RelatedProducts/>
        </div>
    )
}

export default Product