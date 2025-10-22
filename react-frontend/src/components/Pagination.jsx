import React from 'react';
import PrimaryButton from './PrimaryButton';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      <PrimaryButton
        label="←"
        onClick={() => onPageChange(currentPage - 1)}
        type="outline"
        className="px-4 py-2"
        disabled={currentPage === 1}
      />
      
      {/* Page Numbers */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            currentPage === page
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Next Button */}
      <PrimaryButton
        label="→"
        onClick={() => onPageChange(currentPage + 1)}
        type="outline"
        className="px-4 py-2"
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;