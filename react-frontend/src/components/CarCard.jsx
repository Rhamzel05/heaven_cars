import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';

const CarCard = ({ car, onOrder, onQuickView, onCompare }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleImageLoad = () => setImageLoaded(true);
    const handleImageError = (e) => {
        e.target.src = 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&h=300&fit=crop';
    };

    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        onQuickView?.(car);
    };

    const handleOrderClick = (e) => {
        e.stopPropagation();
        onOrder?.(car);
    };

    const formatPrice = (price) => {
        if (!price) return '$0';
        return price.startsWith('$') ? price : `$${price}`;
    };

    const calculateDiscount = () => {
        if (!car.originalPrice || !car.price) return null;
        const original = parseFloat(car.originalPrice.replace(/[$,]/g, ''));
        const current = parseFloat(car.price.replace(/[$,]/g, ''));
        return Math.round(((original - current) / original) * 100);
    };

    const discount = calculateDiscount();

    return (
        <div
            className="group bg-white/60 backdrop-blur-md border border-gray-200
                       rounded-3xl overflow-hidden shadow-md hover:shadow-2xl
                       transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                )}
                <img
                    src={car.image}
                    alt={car.model}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Favorite Button */}
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
                        isFavorite
                            ? 'bg-red-500 text-white shadow-lg scale-110'
                            : 'bg-white/30 text-white hover:bg-red-500 hover:scale-110'
                    }`}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>

                {/* Discount / Type Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                            {discount}% OFF
                        </span>
                    )}
                    <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border backdrop-blur-md ${
                            car.type === 'Electric'
                                ? 'bg-green-500/80 text-white border-green-400'
                                : car.type === 'Sports Car'
                                ? 'bg-red-500/80 text-white border-red-400'
                                : car.type === 'SUV'
                                ? 'bg-orange-500/80 text-white border-orange-400'
                                : car.type === 'Luxury Sedan'
                                ? 'bg-purple-500/80 text-white border-purple-400'
                                : 'bg-blue-500/80 text-white border-blue-400'
                        }`}
                    >
                        {car.type}
                    </span>
                </div>

                {/* Overlay Button */}
                <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <PrimaryButton
                        label="View Details"
                        onClick={handleQuickView}
                        type="glass"
                        className="w-full py-2.5 text-sm font-medium"
                    />
                </div>

                {/* Model + Price Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold drop-shadow-md">{car.model}</h3>
                    <p className="text-sm text-green-300 font-semibold">
                        {formatPrice(car.price)}
                    </p>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5">
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {car.description}
                </p>

                {/* Specs */}
                <div className="flex justify-between text-xs text-gray-500 mb-5">
                    {car.mileage && (
                        <span>🛣️ {car.mileage.split(' ')[0]}</span>
                    )}
                    {car.fuelType && (
                        <span>⛽ {car.fuelType}</span>
                    )}
                    {car.transmission && (
                        <span>⚙️ {car.transmission.split(' ')[0]}</span>
                    )}
                </div>

                {/* Order Button */}
                <PrimaryButton
                    label="Order Now"
                    onClick={handleOrderClick}
                    type="primary"
                    className="w-full text-sm font-semibold py-3"
                />

                {/* Status Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                    {car.isNew && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            New
                        </span>
                    )}
                    {car.certified && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                            Certified
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarCard;
