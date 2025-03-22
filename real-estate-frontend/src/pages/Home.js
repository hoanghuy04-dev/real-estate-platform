import React, {useEffect, useState, useContext, useRef} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import {UserIcon} from '@heroicons/react/24/solid';
import {AuthContext} from '../components/AuthContext';

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const {user, logout} = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref để theo dõi dropdown

    useEffect(() => {
        fetchProperties();

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

    console.log("re-render")

    const fetchProperties = async (searchLocation = '') => {
        try {
            const response = await axios.get('http://localhost:8081/api/properties/search', {
                params: {location: searchLocation}
            });
            if (Array.isArray(response.data)) {
                setProperties(response.data);
            } else {
                console.error('Invalid data format:', response.data);
                setProperties([]);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
            setProperties([]);
        }
    };

    const handleSubmitSearchLocation = (e) => {
        e.preventDefault();
        fetchProperties(searchLocation);
    };

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
                                    <UserIcon className="h-6 w-6 text-gray-600 hover:text-blue-500"/>
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

            {/* Hero section */}
            <section className="relative h-[400px] text-white">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    className="absolute inset-0 w-full h-full"
                >
                    <div>
                        <img
                            src="https://picsum.photos/1200/400?random=1"
                            alt="Slide 1"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    <div>
                        <img
                            src="https://picsum.photos/1200/400?random=2"
                            alt="Slide 2"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    <div>
                        <img
                            src="https://picsum.photos/1200/400?random=3"
                            alt="Slide 3"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                </Carousel>

                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-center items-center flex-col">
                    <h2 className="text-4xl font-bold mb-4">Tìm ngôi nhà mơ ước</h2>
                    <p className="text-lg font-thin mb-6">Khám phá hàng ngàn bất động sản tại Việt Nam</p>
                    <form onSubmit={handleSubmitSearchLocation} className="max-w-md w-full">
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="position"
                            id="position"
                            placeholder="Nhập vị trí: (VD: Hà Nội)"
                            onChange={(e) => setSearchLocation(e.target.value)}
                            value={searchLocation}
                        />
                        <button
                            type="submit"
                            className="bg-white mt-2 w-full p-3 rounded-lg text-blue-600 font-bold hover:bg-gray-100"
                        >
                            Tìm kiếm
                        </button>
                    </form>
                </div>
            </section>

            {/* Listings */}
            <section className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl text-center font-bold mb-8 text-gray-800">
                        Bất động sản nổi bật
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={`https://picsum.photos/300/200?random=${index + 1}`}
                                    alt={property.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="font-bold text-xl text-gray-800">{property.name}</h4>
                                    <p className="text-gray-600">{property.location + " - " + property.price}</p>
                                    <p className="text-gray-500 text-sm mt-2">{property.size}</p>
                                    <button
                                        className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
    );
}