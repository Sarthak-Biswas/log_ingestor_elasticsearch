import React, {createContext, useContext, useState} from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [data, setData] = useContext([])

    const updateData = (newValue) => {
        setData(newValue)
    }

    return ( 
        <AppContext.Provider value={{data, updateData}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext}