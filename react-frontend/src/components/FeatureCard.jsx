import React from "react";

const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        relative overflow-hidden rounded-2xl p-8 cursor-pointer 
        bg-white/80 backdrop-blur-md border border-gray-100 shadow-lg
        transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-2xl
        group
      "
    >
      {/* Gradient Glow Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Icon Section */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-4xl shadow-lg group-hover:scale-110 transform transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h4
        className="
          relative z-10 text-center text-xl font-semibold mb-3
          bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent
          group-hover:scale-105 transition-transform duration-300
        "
      >
        {title}
      </h4>

      {/* Description */}
      <p className="relative z-10 text-center text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
        {description}
      </p>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
    </div>
  );
};

export default FeatureCard;
