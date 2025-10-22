import React from 'react';

const PrimaryButton = ({ label, onClick, type = 'primary', className = '', ...props }) => {
    const baseClasses = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const typeClasses = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:ring-blue-500",
        secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:shadow-lg hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
        danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:from-red-700 hover:to-red-800 focus:ring-red-500"
    };

    return (
        <button
            className={`${baseClasses} ${typeClasses[type]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {label}
        </button>
    );
};

export default PrimaryButton;