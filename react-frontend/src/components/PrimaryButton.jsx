import React from 'react';

const PrimaryButton = ({ 
    label, 
    onClick, 
    type = 'primary', 
    className = '', 
    disabled = false, 
    ...props 
}) => {
    const baseClasses = `
        relative px-6 py-3 rounded-xl font-semibold transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        hover:scale-[1.04] active:scale-[0.97]
    `;

    const typeClasses = {
        primary: `
            bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
            shadow-md hover:shadow-xl 
            hover:from-blue-600 hover:to-indigo-700
            focus:ring-blue-400
        `,
        secondary: `
            bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 
            shadow-inner hover:shadow-lg 
            hover:from-gray-200 hover:to-gray-300 
            focus:ring-gray-400
        `,
        outline: `
            border border-blue-500 text-blue-600 
            bg-white/50 backdrop-blur-sm
            hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
            hover:text-blue-700
            focus:ring-blue-300
        `,
        glass: `
            bg-white/40 text-gray-800 border border-gray-200 
            backdrop-blur-md shadow-sm 
            hover:bg-white/70 hover:shadow-lg
            focus:ring-blue-300
        `,
        danger: `
            bg-gradient-to-r from-red-500 to-red-600 text-white
            hover:from-red-600 hover:to-red-700
            hover:shadow-lg focus:ring-red-400
        `
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${typeClasses[type]} ${className}`}
            {...props}
        >
            {label}
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        </button>
    );
};

export default PrimaryButton;
