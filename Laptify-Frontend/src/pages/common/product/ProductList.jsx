import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Pagination from '@/components/custom/Paganation';

const ProductList = (({ title, products, currentPage, totalPages, sortOptions, sortBy, onPageChange, onSortChange }) => {
  // Pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div>
      {/* Results Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          <span className='text-red-600'>{title}</span>
        </h1>

        {/* Filter Bar */}
        <div className='flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-4'>
            <span className='text-sm text-gray-600'>Sắp xếp theo</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className='px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600'
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Page Navigation */}
          <div className='flex items-center gap-2'>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'
            >
              <ChevronLeft size={18} />
            </button>
            <span className='text-sm text-gray-600'>
              {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition'
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-gray-600 text-lg'>Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
});

export default ProductList;
