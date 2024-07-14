import React, { createContext, useState, useEffect} from "react";
export const AdminContext = createContext();
let port = 4000;

const AdminContextProvider = (props) => {
    let url = `http://localhost:${port}`

    const contextValue = {url};
    return(
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;