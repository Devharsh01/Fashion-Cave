/*Page for rendering other categories like Sarees, Dresses, jewellery of the window */
import React, {useContext, useEffect, useRef, useState} from 'react'
import './CSS/shopCategory.css'
import DropDownIcon from '../components/Assets/dropdown.jsx'
import Item from '../components/Items/Item.jsx';
import { ShopContext } from '../context/ShopContext.jsx';
import tick_gif from '../components/Assets/tick_gif1.gif'
import tick_png from '../components/Assets/tick_picture.png'
import FilterMenu from '../components/FilterMenu/FilterMenu.jsx';

/*import all_product from '../components/Assets/all_product.js';*/

const ShopCategory = (props) => {
    const {filteredProducts} = useContext(ShopContext);
    const [selectedProducts, setSelectedProducts] = useState([]);       //List of selected products on category basis
    const [shownProducts, setShownProducts] = useState([]);             //List of displayed products
    const [count, setCount] = useState(0);                              //Count of new added items
    const [animateShadow, setAnimateShadow] = useState(false);          //Animate the box shadow on load-more
    const [hasMore, setHasMore] = useState(true);                       //Tells more items are to be loaded or not
    const [isHovered, setIsHovered] = useState(false);                  //Manage Sort-by button color
    const [isClicked, setIsClicked] = useState(false);                  //Sort-by Button clicked or not
    const [isFilterHovered, setIsFilterHovered] = useState(false);      //Manage Filter-by button color
    const [isFilterClicked, setIsFilterClicked] = useState(false);      //Filter-by Button clicked or not
    const [isChosen, setIsChosen] = useState('none');                   //Li tag is clicked or not
    const [isRandom, setIsRandom] = useState(true);                     //Li tag is clicked or not
    const originalSrc = tick_gif;
    
    useEffect(()=>{
        window.scrollTo({top: 0, behavior:"smooth"})
    },[])

    useEffect(()=>{
        console.log("Filtered",filteredProducts)
        var newProducts;
        if(isChosen !== 'none') {
            let sortedFilter = [...filteredProducts];
            if(isChosen === "lowest")
                sortedFilter = sortedFilter.sort((a, b) => a.new_price - b.new_price);
            else if(isChosen === "highest") 
                sortedFilter = sortedFilter.sort((a,b)=> b.new_price - a.new_price )
            else if(isChosen === "a-z")
                sortedFilter = sortedFilter.sort((a,b)=> a.name.localeCompare(b.name) )
            else if(isChosen === "z-a")
                sortedFilter = sortedFilter.sort((a,b)=> b.name.localeCompare(a.name) )
            else if(isChosen === "recent")
                sortedFilter = sortedFilter.sort((a,b)=> new Date(b.date) - new Date(a.date) )
            newProducts = sortedFilter.filter(item => item.category === props.category);
        }
        else {
            newProducts = filteredProducts.filter(item => item.category === props.category);
        }
        setSelectedProducts(newProducts)
        setHasMore(true)
    },[props.category, filteredProducts, isRandom])

    const select_products = () =>{
        if(selectedProducts.length<=count){
            return;
        }
        setTimeout(()=>{
            const nextProducts = selectedProducts.slice(count, count+12);                    
            setShownProducts(prevProducts => [...prevProducts, ...nextProducts])     //Add the next products intot he list
            setCount(prevCount => prevCount+12)
        },1500)
    }

    useEffect(()=>{
        if(selectedProducts.length<=count){
            setHasMore(false);
        }
    },[count])

    useEffect(()=>{
        setTimeout(()=> setAnimateShadow(false), 1000)
    },[animateShadow])

    useEffect(()=>{
        const nextProducts = selectedProducts.slice(0,12);                    
        setShownProducts(nextProducts)     //Add the next products intot he list
        setCount(12)
        console.log(selectedProducts)
    },[selectedProducts])

    useEffect(()=>{
        var element = document.querySelector('.shopcategory-sortmenu')
        {isClicked? element.classList.add('visible'): element.classList.remove('visible')}
        },[isClicked])
    
    useEffect(()=>{
        var element = document.querySelector('.shopcategory-filtermenu')
        {isFilterClicked? element.classList.add('visible'): element.classList.remove('visible')}
    },[isFilterClicked])

    useEffect(()=>{
        var element = document.querySelector(`#${isChosen}`)
        if(element){
            if(element.src !== tick_png)
                element.src = tick_png;
            else
                element.src = "";
        }
        setIsRandom(!isRandom)
    },[isChosen])

    const show = (id) => {              //Animation for Sort-By tick
        var element = document.querySelector(`#${id}`);
        if(element && id !== isChosen){
            element.src= originalSrc + '?t=' + new Date().getTime();
        }
    }

    const hide = (id) =>{               //Hide animation for Sort-By tick
        var element = document.querySelector(`#${id}`);
        if(id !== isChosen)
        {
            element.src = '';   
        }
    }

    const handleClick = (id) =>{
        let previousIsChosen = isChosen; 
        {isChosen===id?setIsChosen('none'):setIsChosen(id)}
        hide(previousIsChosen)
        setIsClicked(false)
    }

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-{count}</span> out of {selectedProducts.length} products
                </p>
                <div className='shopcategory-buttons'>
                    <button className="shopcategory-filter" style={{backgroundColor: isFilterClicked?'#ffffff':'#000000'}} onClick={()=>{isFilterClicked?setIsFilterClicked(false):setIsFilterClicked(true); setIsClicked(false)}} onMouseEnter={()=>setIsFilterHovered(true)} onMouseLeave={()=>setIsFilterHovered(false)}>
                        <div className='shopcategory-filter-black' style={{backgroundColor: isFilterClicked?'#000000':'#ffffff'}}></div><div className='shopcategory-filter-items' style={{color: isFilterHovered? isFilterClicked?'#ffffff':'#000000' :isFilterClicked?'#000000':'#ffffff'}}><p>Filter By </p><DropDownIcon fill={isFilterClicked?isFilterHovered?"#fff":"#000" :isFilterHovered?"#000":"#ffffff"}/></div>
                    </button>
                    <button className="shopcategory-sort" style={{backgroundColor: isClicked?'#ffffff':'#000000'}} onClick={()=>{isClicked?setIsClicked(false):setIsClicked(true); setIsFilterClicked(false)}} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
                        <div className='shopcategory-black' style={{backgroundColor: isClicked?'#000000':'#ffffff'}}></div><div className='shopcategory-items' style={{color: isHovered? isClicked?'#ffffff':'#000000' :isClicked?'#000000':'#ffffff'}}><p>Sort by </p><DropDownIcon fill={isClicked?isHovered?"#fff":"#000" :isHovered?"#000":"#ffffff"}/></div>
                    </button>
                </div>
            </div>
            <div className="shopcategory-product">
                <div className="shopcategory-menu">
                    <div className="shopcategory-filtermenu">
                        <FilterMenu />
                    </div>
                    <ul className="shopcategory-sortmenu" >
                        <li className="lowest" onClick={()=>{handleClick('lowest')}} onMouseEnter={() => {show('lowest')}} onMouseLeave={()=>{hide('lowest')}}>
                            <div><img id="lowest" src="" alt="" /></div>
                            Price Low to High
                        </li>
                        <hr/>
                        <li className="highest" onClick={()=>{handleClick('highest')}} onMouseEnter={() => {show('highest')}} onMouseLeave={()=>{hide('highest')}}>
                            <div><img id="highest" src="" alt="" /></div>
                            Price High to Low
                        </li>
                        <hr/>
                        <li className="a-z" onClick={()=>{handleClick('a-z')}} onMouseEnter={() => {show('a-z')}} onMouseLeave={()=>{hide('a-z')}}>
                            <div><img id="a-z" src="" alt="" /></div>
                            Sort A to Z
                        </li>
                        <hr/>
                        <li className="z-a" onClick={()=>{handleClick('z-a')}} onMouseEnter={() => {show('z-a')}} onMouseLeave={()=>{hide('z-a')}}>
                            <div><img id="z-a" src="" alt="" /></div>
                            Sort Z to A
                        </li>
                        <hr/>
                        <li className="recent" onClick={()=>{handleClick('recent')}} onMouseEnter={() => {show('recent')}} onMouseLeave={()=>{hide('recent')}}>
                            <div><img id="recent" src="" alt="" /></div>
                            Recently Added
                        </li>
                    </ul>
                </div>
                <div className='shopcategory-products'>
                    {shownProducts.length > 0 ?shownProducts.map((item,i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                
                    }) : <p>NO PRODUCT AVAILABLE</p>}
                </div>
            </div>
            <button className={`shopcategory-loadmore ${animateShadow ? 'revolving-shadow' : ''} ${hasMore ? '' : 'disabled'}`} onClick={()=>{select_products(); setAnimateShadow(true)}} disabled={!hasMore}>Explore More
            </button>
        </div>
    )
}

export default ShopCategory