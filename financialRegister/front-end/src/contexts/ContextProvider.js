import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [totalAmount, setTotalAmount] = useState('');
    const [totalBills, setTotalBills] = useState('');
    const [categories, setCategories] = useState([]);
    const [bills, setBills] = useState([]);
    const [billsByCategory, setBillsByCategory] = useState({});
    
    return (
        <StateContext.Provider value={{ totalAmount, setTotalAmount, totalBills, setTotalBills, bills, setBills, categories, setCategories, billsByCategory, setBillsByCategory }}>
        {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);