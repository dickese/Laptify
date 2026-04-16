import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../product/ProductCard';
import { mockSearchProducts } from '@/data/mockSearchProducts';
import { getRandomProducts } from '../utils/homePageUtils';

const BestSellingSection = () => {
  // Get 4 random products for best-selling
  const bestSellingProducts = getRandomProducts(mockSearchProducts, 4);

  return (
    <div className='mb-12'>
      {/* Header with section title and View All button */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-4 h-8 bg-red-600 rounded'></div>
            <span className='text-red-600 font-semibold text-sm'>Chuyên mục</span>
          </div>
          <h2 className='text-2xl font-bold text-gray-900'>Sản phẩm bán nhiều nhất</h2>
        </div>
        <Link
          to='/products'
          className='bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition'
        >
          Xem tất cả
        </Link>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {bestSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellingSection;
