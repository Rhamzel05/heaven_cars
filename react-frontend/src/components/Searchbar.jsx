import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onFilterChange, selectedFilter }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder="Search cars by model, type, or features..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Filter Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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