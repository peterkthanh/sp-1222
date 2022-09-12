import React, { createContext, useContext, useReducer } from "react";
export const stateContext = createContext();
export const StateProviders = (reducer, intalState, children) => (
    <stateContext.Provider value={useReducer(intalState, children)}>
        {children}
    </stateContext.Provider>
)
export const useStateValue = () => useContext(stateContext);