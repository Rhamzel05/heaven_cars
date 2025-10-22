import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';

const CarCard = ({ car, onOrder, onQuickView, onCompare }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = (e) => {
        e.target.src = 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&h=300&fit=crop';
    };

    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        if (onQuickView) onQuickView(car);
    };

    const handleOrderClick = (e) => {
        e.stopPropagation();
        if (onOrder) onOrder(car);
    };

    const formatPrice = (price) => {
        if (!price) return '$0';
        if (price.startsWith('$')) return price;
        return `$${price}`;
    };

    const calculateDiscount = () => {
        if (!car.originalPrice || !car.price) return null;
        const original = parseFloat(car.originalPrice.replace(/[$,]/g, ''));
        const current = parseFloat(car.price.replace(/[$,]/g, ''));
        const discount = ((original - current) / original) * 100;
        return Math.round(discount);
    };

    const discount = calculateDiscount();

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
            {/* Car Image - Main Highlight */}
            <div className="relative h-64 overflow-hidden">
                {/* Loading Skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                )}

                {/* Main Image */}
                <img
                    src={car.image}
                    alt={car.model}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />

                {/* Image Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                        <PrimaryButton
                            label="View Details"
                            onClick={handleQuickView}
                            type="outline"
                            className="w-full justify-center py-2.5 text-white border-white hover:bg-white hover:text-gray-900"
                        />
                    </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                            {discount}% OFF
                        </span>
                    )}
                    <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border ${
                            car.type === 'Electric'
                                ? 'bg-green-500 text-white border-green-400'
                                : car.type === 'Sports Car'
                                ? 'bg-red-500 text-white border-red-400'
                                : car.type === 'SUV'
                                ? 'bg-orange-500 text-white border-orange-400'
                                : car.type === 'Luxury Sedan'
                                ? 'bg-purple-500 text-white border-purple-400'
                                : 'bg-blue-500 text-white border-blue-400'
                        }`}
                    >
                        {car.type}
                    </span>
                </div>

                {/* Favorite Button */}
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 backdrop-blur-sm ${
                        isFavorite
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'bg-white/20 text-white hover:bg-red-500'
                    }`}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-3 left-3">
                    <div className="text-white">
                        <div className="text-lg font-bold drop-shadow-lg">{car.model.split(' ')[0]}</div>
                        <div className="text-sm font-semibold text-green-300 drop-shadow-lg">
                            {formatPrice(car.price)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Minimal Content Below Image */}
            <div className="p-4">
                {/* Essential Info */}
                <div className="mb-3">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-1 mb-1">
                        {car.model}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-2">
                        {car.description}
                    </p>
                </div>

                {/* Key Specs - Minimal */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    {car.mileage && (
                        <div className="flex items-center gap-1">
                            <span>🛣️</span>
                            <span>{car.mileage.split(' ')[0]}</span>
                        </div>
                    )}
                    {car.fuelType && (
                        <div className="flex items-center gap-1">
                            <span>⛽</span>
                            <span>{car.fuelType}</span>
                        </div>
                    )}
                    {car.transmission && (
                        <div className="flex items-center gap-1">
                            <span>⚙️</span>
                            <span>{car.transmission.split(' ')[0]}</span>
                        </div>
                    )}
                </div>

                {/* Single CTA Button */}
                <PrimaryButton
                    label="Order Now"
                    onClick={handleOrderClick}
                    type="primary"
                    className="w-full py-3 text-sm font-semibold"
                />

                {/* Minimal Status Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
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