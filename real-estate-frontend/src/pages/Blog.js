import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyPost from '../components/PropertyPost';

export default function Blog() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [locationFilter, setLocationFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minSize, setMinSize] = useState('');
    const [maxSize, setMaxSize] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/properties');
                if (Array.isArray(response.data)) {
                    setProperties(response.data);
                    setFilteredProperties(response.data);
                } else {
                    console.error('Invalid data format:', response.data);
                    setProperties([]);
                    setFilteredProperties([]);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                setProperties([]);
                setFilteredProperties([]);
            }
        };

        fetchProperties();
    }, []);

    // Hàm chuyển đổi giá từ chuỗi (VD: "5 tỷ VND") thành số (đơn vị: tỷ)
    const parsePrice = (priceStr) => {
        const match = priceStr.match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[0]) : 0;
    };

    // Hàm chuyển đổi diện tích từ chuỗi (VD: "120m²") thành số
    const parseSize = (sizeStr) => {
        const match = sizeStr.match(/(\d+)/);
        return match ? parseInt(match[0]) : 0;
    };

    // Lọc properties khi các tiêu chí thay đổi
    useEffect(() => {
        let filtered = properties;

        // Lọc theo vị trí
        if (locationFilter.trim() !== '') {
            filtered = filtered.filter((property) =>
                property.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        // Lọc theo giá
        if (minPrice !== '' || maxPrice !== '') {
            filtered = filtered.filter((property) => {
                const price = parsePrice(property.price);
                const min = minPrice !== '' ? parseFloat(minPrice) : 0;
                const max = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;
                return price >= min && price <= max;
            });
        }

        // Lọc theo diện tích
        if (minSize !== '' || maxSize !== '') {
            filtered = filtered.filter((property) => {
                const size = parseSize(property.size);
                const min = minSize !== '' ? parseInt(minSize) : 0;
                const max = maxSize !== '' ? parseInt(maxSize) : Infinity;
                return size >= min && size <= max;
            });
        }

        // Lọc theo loại bất động sản
        if (typeFilter !== '') {
            console.log(typeFilter)
            filtered = filtered.filter((property) => property.type === typeFilter);
        }

        setFilteredProperties(filtered);
    }, [locationFilter, minPrice, maxPrice, minSize, maxSize, typeFilter, properties]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <section className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
                    {/* Thanh lọc bên trái */}
                    <div className="w-1/4 pr-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Lọc bất động sản</h3>
                        {/* Lọc theo vị trí */}
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-gray-700 mb-2">
                                Vị trí
                            </label>
                            <input
                                type="text"
                                id="location"
                                placeholder="Nhập vị trí (VD: Hà Nội)"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Lọc theo giá */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Khoảng giá (tỷ VND)</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    placeholder="Từ"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Đến"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        {/* Lọc theo diện tích */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Diện tích (m²)</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    placeholder="Từ"
                                    value={minSize}
                                    onChange={(e) => setMinSize(e.target.value)}
                                    className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Đến"
                                    value={maxSize}
                                    onChange={(e) => setMaxSize(e.target.value)}
                                    className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        {/* Lọc theo loại bất động sản */}
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 mb-2">
                                Loại bất động sản
                            </label>
                            <select
                                id="type"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Tất cả</option>
                                <option value="HOUSE">Nhà</option>
                                <option value="APARTMENT">Căn hộ</option>
                                <option value="VILLA">Biệt thự</option>
                            </select>
                        </div>
                    </div>

                    {/* Danh sách bất động sản */}
                    <div className="w-3/4">
                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                            Danh sách bất động sản
                        </h2>
                        {filteredProperties.length === 0 ? (
                            <p className="text-center text-gray-600">Không có bài viết nào.</p>
                        ) : (
                            filteredProperties.map((property) => (
                                <div key={property.propertyID} className="mb-8">
                                    <PropertyPost property={property}/>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}