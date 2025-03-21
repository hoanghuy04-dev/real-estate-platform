import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/login', {
                username,
                password
            });
            setMessage(response.data);
        } catch (error) {
            setMessage('Login failed!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all hover:scale-105">
                {/* Tiêu đề */}
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-8">Sign in to your Real Estate account</p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out"
                    >
                        Sign In
                    </button>
                </form>

                {/* Thông báo */}
                {message && (
                    <p className={`mt-6 text-center font-medium ${message.includes('successful') ||  message.includes('Welcome')? 'text-green-600' : 'text-red-600'} animate-pulse`}>
                        {message}
                    </p>
                )}

                {/* Link bổ sung */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-indigo-600 hover:underline font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;