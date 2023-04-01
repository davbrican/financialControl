import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [totalAmount, setTotalAmount] = useState('');
    
    return (
        <StateContext.Provider value={{ totalAmount, setTotalAmount }}>
        {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);