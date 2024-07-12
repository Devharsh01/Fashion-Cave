import React, { useEffect, useState } from "react";
import './DescriptionBox.css'

const DescriptionBox = () => {

    const [showing, setShowing] = useState("description")

    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className={`descriptionbox-nav-box ${showing === "review" ? "" : "fade"}`} onClick={()=>{setShowing("description")}} >
                    Description
                </div>
                <div className={`descriptionbox-nav-box ${showing === "description" ? "" : "fade"}`} onClick={()=>{setShowing("review")}} >Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                {showing === "description" ? <p><p>Ecommerce is a method of buying and selling goods and services online. The definition of ecommerce business can also include tactics like affiliate marketing. You can use ecommerce channels such as your own website, an established selling website like Amazon, or social media to drive online sales.</p>
                <p>&nbsp;&nbsp;</p> <p>As for style guides, the Associated Press Style Guide (AP Style) and the Chicago Manual of Style also dictate that the correct spelling is e-commerce. Per the AP Stylebook: “AP uses hyphenated e- for generic terms such as e-commerce and e-strategies.</p></p>: 
                <p><p>Ecommerce is a method of buying and selling goods and services online. And Fashion Cave is among one of the best in them.</p>
                <p>&nbsp;&nbsp;</p> <p>As for style guides, the Associated Press Style Guide (AP Style) and the Chicago Manual of Style also dictate that the correct spelling is e-commerce. Per the AP Stylebook: “AP uses hyphenated e- for generic terms such as e-commerce and e-strategies.</p></p> }
                
            </div>
        </div>
    )
}
 
export default DescriptionBox