import React from 'react';
import PrimaryButton from './PrimaryButton';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      {/* Previous Button */}
      <PrimaryButton
        label="←"
        onClick={() => onPageChange(currentPage - 1)}
        type="outline"
        className="px-4 py-2 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      />

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <PrimaryButton
        label="→"
        onClick={() => onPageChange(currentPage + 1)}
        type="outline"
        className="px-4 py-2 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
