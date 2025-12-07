'use client';

import { useEffect, useState } from 'react';
import Home from './Home';
import AuthLogin from './AuthLogin';

export default function ClientHome() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(!!localStorage.getItem('token'));
    }, []);

    return isAuth ? <Home /> : <AuthLogin />;
}