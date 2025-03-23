import React, { useEffect, useState, useContext, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async (searchLocation = '') => {
        try {
            const response = await axios.get('http://localhost:8081/api/properties/search', {
                params: { location: searchLocation }
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
        // fetchProperties(searchLocation);
        if (searchLocation.trim())
            navigate(`/blog?filterLocation=${encodeURIComponent(searchLocation)}`)
        else 
            navigate('/blog')
    };



    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <Header />

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
                            <div key={property.propertyID} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={`https://picsum.photos/300/200?random=${index + 1}`}
                                    alt={property.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="font-bold text-xl text-gray-800">{property.name}</h4>
                                    <p className="text-gray-600">{property.location + " - " + property.price}</p>
                                    <p className="text-gray-500 text-sm mt-2">{property.size}</p>
                                    <a
                                        href={`/properties/${property.propertyID}`}
                                        className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 block text-center hover:bg-blue-600"
                                    >
                                        Xem chi tiết
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}

            <Footer />
        </div>
    );
}