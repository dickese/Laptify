import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../../product/ProductCard';
import { mockSearchProducts } from '@/data/mockSearchProducts';
import { getRandomProducts } from '../utils/homePageUtils';

const TrendingProductsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Get 8 random products for trending
  const trendingProducts = getRandomProducts(mockSearchProducts, 8);
  const productsPerPage = 4;
  const totalPages = Math.ceil(trendingProducts.length / productsPerPage);
  
  const startIdx = currentPage * productsPerPage;
  const visibleProducts = trendingProducts.slice(startIdx, startIdx + productsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className='mb-12'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-4 h-8 bg-red-600 rounded'></div>
            <span className='text-red-600 font-semibold text-sm'>Chuyên mục</span>
          </div>
          <h2 className='text-2xl font-bold text-gray-900'>Khám phá</h2>
        </div>

        {/* Navigation Arrows */}
        <div className='flex gap-2'>
          <button
            onClick={handlePrev}
            className='p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition'
            aria-label='Previous'
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className='p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition'
            aria-label='Next'
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className='text-center'>
        <Link
          to='/products'
          className='inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition'
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
};

export default TrendingProductsSection;
