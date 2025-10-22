import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onFilterChange, selectedFilter }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-6 mb-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="flex-1 w-full relative">
          <input
            type="text"
            placeholder="🔍 Search cars by model, type, or features..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-transparent focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-800 transition-all duration-300 shadow-sm focus:shadow-md"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            <option value="all">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Sports Car">Sports Car</option>
            <option value="Electric">Electric</option>
            <option value="Luxury Sedan">Luxury Sedan</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
