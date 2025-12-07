"use client";
import React, { useEffect, useState } from 'react';

const AuthLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('name@company.com');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        window.onTelegramAuth = async (user) => {
            try {
                const res = await fetch('/api/auth/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || 'Telegram bilan ulanishda xatolik');
                    return;
                }

                // Token va user ma'lumotlarini saqlaymiz
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                setSuccess('Telegram orqali muvaffaqiyatli kirish!');

                // 1 soniyadan keyin dashboardga o'tkazamiz
                setTimeout(() => {
                    window.location.href = '/';
                }, 1200);

            } catch (err) {
                setError('Internet yoki server xatoligi');
            }
        };

        // Telegram widgetni yuklaymiz
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '12');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');

        document.body.appendChild(script);
        // Tozalash
        return () => {
            document.body.removeChild(script);
            delete window.onTelegramAuth;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const url = isLogin ? '/auth/login' : '/users';
        const body = isLogin
            ? { username: email.split('@')[0], password }
            : { name: username, surname: username, username: email.split('@')[0], email, password };

        try {
            const response = await fetch(`http://localhost:3000${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Something went wrong');

            if (isLogin) {
                setSuccess('Login successful! Token: ' + data.token);
            } else {
                setSuccess('Registration successful! User ID: ' + data.id);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
        setEmail('name@company.com');
        setPassword('');
        setUsername('');
    };

    const handleGoogleSignIn = () => {
        window.location.href = '/api/auth/google';
    };

    return (
        <div className="flex h-[88.8vh] items-center justify-center bg-linear-to-r from-gray-900 via-blue-950 to-gray-900">
            <div className='px-5'>
                <div className="bg-gray-800 min-w-[320px] sm:min-w-[460px] p-6 rounded-lg w-full max-w-md z-10 ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">{isLogin ? 'Welcome back' : 'Create Account'}</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        {isLogin
                            ? 'Start your website in seconds. Don\'t have an account? '
                            : 'Already have an account? '}
                        <a href="#" className="text-blue-400 hover:text-blue-300" onClick={toggleForm}>
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </a>.
                    </p>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {isLogin && (
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="mr-2 accent-blue-500"
                                    />
                                    <label htmlFor="remember" className="text-gray-400 text-sm">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-blue-400 text-sm hover:text-blue-300">
                                    Forgot password?
                                </a>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            {isLogin ? 'Sign in to your account' : 'Create account'}
                        </button>
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                        {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
                    </form>
                    <div className="my-4 text-center text-gray-400">or</div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-gray-700 text-gray-200 p-2 rounded-md flex items-center justify-center mb-2 hover:bg-gray-600 transition duration-200"
                    >
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Sign in with Google
                    </button>
                    <div id="telegram-login" className="mt-4 flex justify-center"></div>
                    {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}
                    {success && <p className="text-green-400 text-center mt-4 text-sm">{success}</p>}
                </div>
            </div>
        </div>
    );
};

export default AuthLogin;