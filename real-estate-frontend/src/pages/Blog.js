import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext'
import {UserIcon} from '@heroicons/react/24/solid';

export default function Blog() {
    const [properties, setProperties] = useState([])
    const [searchParams] = useSearchParams()
    const selectedId = searchParams.get('id')

    const [searchLocation, setSearchLocation] = useState('');
    const { user, logout } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref để theo dõi dropdown


    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/properties');

                if (Array.isArray(response.data)) {
                    // Nếu có selectedId, đưa bất động sản đó lên đầu
                    if (selectedId) {
                        const selectedProperty = response.data.find(
                            (property) => property.propertyID === parseInt(selectedId)
                        )

                        const unSelectedProperties = response.data.filter(
                            (property) => property.propertyID !== parseInt(selectedId)
                        )

                        if (selectedProperty) {
                            setProperties([selectedProperty, ...unSelectedProperties])
                        } else {
                            setProperties(response.data)
                        }
                    } else {
                        setProperties(response.data)
                    }
                } else {
                    console.error('Invalid data format:', response.data);
                    setProperties([]);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                setProperties([]);
            }
        }

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

    }, [selectedId]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Real Estate</h1>
                    <div className="flex items-center space-x-4">
                        <a href="/" className="text-gray-600 hover:text-blue-500 ">Trang chủ</a>
                        <a href="/blog" className="text-gray-600 hover:text-blue-500">Bài viết</a>
                        <a href="/contact" className="text-gray-600 hover:text-blue-500">Liên hệ</a>
                        <a href="/about" className="text-gray-600 hover:text-blue-500">Giới thiệu</a>
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

            {/* BLog section */}
            <section className="py-6">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        Danh sách bất động sản
                    </h2>
                    {properties.length === 0 ? (
                        <p className="text-center text-gray-600">Không có bài viết nào.</p>
                    ) : (
                        properties.map((property) => (
                            <div
                                key={property.propertyID}
                                className="bg-white rounded-lg shadow-md mb-6 p-4"
                            >
                                {/* Header của bài viết */}
                                <div className="flex items-center mb-4">
                                    <img
                                        src="https://picsum.photos/40/40?random=1"
                                        alt="User avatar"
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Real Estate Agency
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Đăng vào {new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Nội dung bài viết */}
                                <h4 className="text-xl font-bold text-gray-800 mb-2">
                                    {property.name}
                                </h4>
                                <p className="text-gray-600 mb-4">{property.description}</p>
                                <img
                                    src={property.imageURL}
                                    alt={property.name}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                                <div className="text-gray-600 mb-4">
                                    <p><strong>Vị trí:</strong> {property.location}</p>
                                    <p><strong>Giá:</strong> {property.price}</p>
                                    <p><strong>Diện tích:</strong> {property.size}</p>
                                </div>

                                {/* Tương tác */}
                                <div className="flex space-x-4 text-gray-500">
                                    <button className="hover:text-blue-500">Thích</button>
                                    <button className="hover:text-blue-500">Bình luận</button>
                                    <button className="hover:text-blue-500">Chia sẻ</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="p-6 bg-gray-800 text-white min-h-48 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>© 2025 Real Estate. All rights reserved.</p>
                    <p className="mt-2">Email: duonghoanghuydhi2@gmail.com | Phone: 0364-635-032</p>
                </div>
            </footer>
        </div>
    )
}
