import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    useEffect(() => {
        if (token && userStr) {
            const user = JSON.parse(decodeURIComponent(userStr));
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/';
        } else if (searchParams.get('error')) {
            window.location.href = '/login?error=' + searchParams.get('error');
        }
    }, [searchParams]);

    return <div>Loading...</div>;
};

export default AuthCallback;