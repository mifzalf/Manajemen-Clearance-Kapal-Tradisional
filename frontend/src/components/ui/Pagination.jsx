import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePagination, DOTS } from '../../hooks/usePagination'; // <-- Import hook

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1 // Jumlah angka di sebelah halaman aktif
  });

  // Jika hanya ada 1 halaman atau kurang, jangan tampilkan paginasi
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    paginate(currentPage + 1);
  };

  const onPrevious = () => {
    paginate(currentPage - 1);
  };

  return (
    <nav>
      <ul className="inline-flex items-center -space-x-px text-sm">
        <li>
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <span className="hidden sm:inline">Sebelumnya</span>
            <FaChevronLeft className="sm:hidden h-4 w-4" />
          </button>
        </li>
        
        {paginationRange.map((pageNumber, index) => {
          // Jika item adalah elipsis, tampilkan elemen elipsis
          if (pageNumber === DOTS) {
            return <li key={DOTS + index} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">...</li>;
          }

          // Jika item adalah nomor halaman, tampilkan tombol
          return (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`px-3 py-2 leading-tight border border-gray-300 ${
                  currentPage === pageNumber
                    ? 'z-10 text-blue-600 bg-blue-50 hover:bg-blue-100'
                    : 'text-gray-500 bg-white hover:bg-gray-100'
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li>
          <button
            onClick={onNext}
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