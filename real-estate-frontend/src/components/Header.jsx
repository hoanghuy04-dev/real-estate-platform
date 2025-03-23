import React, {useContext, useEffect, useRef, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {UserIcon} from '@heroicons/react/24/solid';
import {Link} from "react-router-dom";
export default function Header() {

    const {user, logout} = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref để theo dõi dropdown

    useEffect(() => {
        // Thêm sự kiện click để đóng dropdown khi click ra ngoài
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        // return () => {
        //     document.removeEventListener('mousedown', handleClickOutside);
        // };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };
    return (
        <header className="bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Real Estate</h1>
                <div className="flex items-center space-x-4">
                    <a href="/" className="text-gray-600 hover:text-blue-500 ">Trang chủ</a>
                    <Link to="/blog" className="text-gray-600 hover:text-blue-500">Bài viết</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-blue-500">Liên hệ</Link>
                    <Link to="/about" className="text-gray-600 hover:text-blue-500">Giới thiệu</Link>
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="focus:outline-none"
                            >
                                <UserIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                    // onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Thông tin tài khoản
                                    </a>
                                    <a
                                        href="/settings"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                    // onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Cài đặt
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <a href="/login" className="text-gray-600 hover:text-blue-500">Login</a>
                            <a href="/register" className="text-gray-600 hover:text-blue-500">Register</a>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}
