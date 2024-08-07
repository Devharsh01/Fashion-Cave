import React from "react";
import './Admin.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from '../../components/ListProduct/ListProduct'
import Users from "../../components/Users/UsersList";
import OrdersList from "../../components/OrdersList/OrdersList";

const Admin = () => {
    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path = '/addproduct' element = {<AddProduct/>}/>
                <Route path = '/listproduct' element = {<ListProduct/>}/>
                <Route path = '/listusers' element = {<Users/>} />
                <Route path = '/orders' element = {<OrdersList/>} />
            </Routes>
        </div>
    )
}

export default Admin;