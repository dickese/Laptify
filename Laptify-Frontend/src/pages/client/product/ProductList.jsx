import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockSearchProducts, sortOptions } from '@/data/mockSearchProducts';
import ProductCard from './ProductCard';
import Pagination from '@/components/custom/Paganation';

const ProductList = (({ type, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevant');
  const itemsPerPage = 9;

  // Sort products
  const sortedProducts = useMemo(() => {
    let products = [...mockSearchProducts];

    const sorted = [...products];
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'newest':
        return sorted.reverse();
      case 'bestseller':
        return sorted.sort((a, b) => b.purchaseCount - a.purchaseCount);
      case 'relevant':
      default:
        return sorted;
    }
  }, [sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {/* Results Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          <span className='text-red-600'>"{title}"</span>
        </h1>

        {/* Filter Bar */}
        <div className='flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-4'>
            <span className='text-sm text-gray-600'>Sắp xếp theo</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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
      {paginatedProducts.length > 0 ? (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
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
