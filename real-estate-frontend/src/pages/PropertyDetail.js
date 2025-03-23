import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true); // Trạng thái thu gọn/mở rộng khung chat

    const currentUser = { username: 'Khách hàng' };

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/properties/${id}`);
                if (response.data) {
                    setProperty(response.data);
                } else {
                    setError('Không tìm thấy bất động sản.');
                }
            } catch (err) {
                setError('Lỗi khi tải dữ liệu bất động sản.');
                console.error('Error fetching property:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();

        const socket = new SockJS('http://localhost:8081/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                setConnected(true);
                setStompClient(client);
                client.subscribe('/topic/messages', (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    if (receivedMessage.propertyId === parseInt(id)) {
                        setChatMessages((prev) => [...prev, receivedMessage]);
                    }
                });
            },
            onStompError: (error) => {
                console.error('WebSocket connection error:', error);
            },
        });
        client.activate();

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [id]);

    const sendMessage = () => {
        if (stompClient && connected && message.trim() !== '') {
            const chatMessage = {
                content: message,
                sender: currentUser.username,
                receiver: property?.author?.name,
                propertyId: parseInt(id),
            };
            stompClient.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage),
            });
            setMessage('');
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <p className="text-gray-600">Đang tải...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <p className="text-red-500">{error}</p>
                    <Link to="/blog" className="mt-4 inline-block text-blue-500 hover:underline">
                        Quay lại danh sách bất động sản
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        to="/blog"
                        className="inline-block mb-6 text-blue-500 hover:underline"
                    >
                        ← Quay lại danh sách bất động sản
                    </Link>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{property.name}</h2>
                        <img
                            src={property.imageURL}
                            alt={property.name}
                            className="w-full h-96 object-cover rounded-lg mb-6"
                        />
                        <div className="text-gray-600 mb-6">
                            <p className="mb-2"><strong>Loại:</strong> {property.type}</p>
                            <p className="mb-2"><strong>Vị trí:</strong> {property.location}</p>
                            <p className="mb-2"><strong>Giá:</strong> {property.price}</p>
                            <p className="mb-2"><strong>Diện tích:</strong> {property.size}</p>
                            <p className="mb-2"><strong>Mô tả:</strong></p>
                            <p>{property.description}</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin người đăng</h3>
                            <p className="mb-2"><strong>Tên:</strong> {property.author.name}</p>
                            <p className="mb-2"><strong>Email:</strong> {property.author.email}</p>
                            <p className="mb-4"><strong>Số điện thoại:</strong> {property.author.phone}</p>
                            <div className="flex space-x-4">
                                <a
                                    href={`tel:${property.author.phone}`}
                                    className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                                >
                                    Gọi điện
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Khu vực nhắn tin cố định ở góc phải dưới */}
            <div
                className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
                    isChatOpen ? 'w-96 h-[500px]' : 'w-64 h-12'
                }`}
            >
                <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
                    {/* Tiêu đề khung chat */}
                    <div
                        className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center cursor-pointer"
                        onClick={toggleChat}
                    >
                        <h3 className="text-lg font-semibold">
                            Nhắn tin với {property.author.name}
                        </h3>
                        <button className="text-white">
                            {isChatOpen ? '▼' : '▲'}
                        </button>
                    </div>

                    {/* Nội dung khung chat (hiển thị khi mở) */}
                    {isChatOpen && (
                        <>
                            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                                {chatMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-2 ${
                                            msg.sender === currentUser.username ? 'text-right' : 'text-left'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block p-2 rounded-lg ${
                                                msg.sender === currentUser.username
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            <strong>{msg.sender}:</strong> {msg.content}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Nhập tin nhắn..."
                                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Gửi
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PropertyDetail;