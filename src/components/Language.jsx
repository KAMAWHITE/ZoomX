"use client"
import React, { useState, useEffect, createContext, useContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
    const [til, setTil] = useState('uz');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');

        if (savedLanguage) setTil(savedLanguage);
    }, []);

    useEffect(() => {
        localStorage.setItem('language', til);
    }, [til]);

    const changeLanguage = (newLanguage) => {
        setTil(newLanguage);
    };

    return (
        <AppContext.Provider value={{ til, changeLanguage}}>
            {children}
        </AppContext.Provider>
    );
}

function useApp() {
    return useContext(AppContext);
}

export { AppProvider, useApp };