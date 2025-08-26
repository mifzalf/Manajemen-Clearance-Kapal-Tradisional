import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="inline-flex items-center -space-x-px text-sm">
        <li>
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <span className="hidden sm:inline">Sebelumnya</span>
            <FaChevronLeft className="sm:hidden h-4 w-4" />
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight border border-gray-300 ${
                currentPage === number
                  ? 'z-10 text-blue-600 bg-blue-50 hover:bg-blue-100'
                  : 'text-gray-500 bg-white hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <FaChevronRight className="sm:hidden h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;