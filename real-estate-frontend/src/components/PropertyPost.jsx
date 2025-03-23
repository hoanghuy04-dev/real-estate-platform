import React from 'react'

export default function PropertyPost({ property }) {
    return (
        <div
            className="bg-white 
            rounded-lg shadow-md 
            mb-6 p-4 
            hover:bg-gray-100
            "
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
            <div className="wrapper flex items-end justify-between">
                <div className="text-gray-600 mb-4">
                    <p><strong>Vị trí:</strong> {property.location}</p>
                    <p><strong>Giá:</strong> {property.price}</p>
                    <p><strong>Diện tích:</strong> {property.size}</p>
                </div>

                <div className="text-end">
                    <a
                        href={`/properties/${property.propertyID}`}
                        className="block text-center bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-0"
                    >
                        Xem chi tiết →
                    </a>
                </div>
            </div>

            {/* Tương tác */}
            <div className="flex space-x-4 text-gray-500">
                <button className="hover:text-blue-500">Thích</button>
                <button className="hover:text-blue-500">Bình luận</button>
                <button className="hover:text-blue-500">Chia sẻ</button>
            </div>
        </div>
    )
}
