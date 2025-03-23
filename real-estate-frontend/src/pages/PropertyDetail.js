import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PropertyDetail() {
    const { id } = useParams(); // Lấy id từ URL
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:9111/api/properties/${id}`);
                setProperty(response.data);
                setLoading(false);
            } catch (err) {
                setError('Không tìm thấy bất động sản.');
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-gray-600">Đang tải...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Real Estate</h1>
                    <div className="space-x-4">
                        <a href="/" className="text-gray-600 hover:text-blue-500">Trang chủ</a>
                        <a href="/blog" className="text-gray-600 hover:text-blue-500">Bài viết</a>
                        <a href="/contact" className="text-gray-600 hover:text-blue-500">Liên hệ</a>
                        <a href="/about" className="text-gray-600 hover:text-blue-500">Giới thiệu</a>
                        <a href="/login" className="text-gray-600 hover:text-blue-500">Login</a>
                        <a href="/register" className="text-gray-600 hover:text-blue-500">Register</a>
                    </div>
                </nav>
            </header>

            {/* Property Detail Section */}
            <section className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">{property.name}</h2>
                    <img
                        src={property.imageUrl}
                        alt={property.name}
                        className="w-full h-96 object-cover rounded-lg mb-6"
                    />
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 mb-4">{property.description}</p>
                        <div className="text-gray-600 mb-4">
                            <p><strong>Vị trí:</strong> {property.location}</p>
                            <p><strong>Giá:</strong> {property.price}</p>
                            <p><strong>Diện tích:</strong> {property.size}</p>
                        </div>
                        <a
                            href="/blog"
                            className="inline-block bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                        >
                            Quay lại danh sách bài viết
                        </a>
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

export default PropertyDetail;