import React, {useContext, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/register', {
                username,
                password,
                email
            });
            setMessage(response.data);
            if(response.data.success) {
                login(response.data.user)
                navigate('/');
            }
        } catch (error) {
            setMessage('Registration failed!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all hover:scale-105">
                {/* Tiêu đề */}
                <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-900 tracking-tight">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-8">Sign up a new account</p>

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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Thông báo */}
                {message && (
                    <p className={`mt-6 text-center font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'} animate-pulse`}>
                        {message}
                    </p>
                )}

                {/* Link bổ sung */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-600 hover:underline font-medium">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;