import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../product/ProductCard';
import { mockSearchProducts } from '@/data/mockSearchProducts';

const FeaturedShowcase = () => {
  // Select featured products (we'll use the first 4 for consistency)
  const featuredProducts = mockSearchProducts.slice(0, 4);

  return (
    <div className='mb-12'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>Sản phẩm nổi bật</h2>
      
      {/* 2x2 + 4 item grid layout */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6'>
        {/* Left: Large featured product */}
        <div className='lg:col-span-2 lg:row-span-2'>
          <ProductCard product={featuredProducts[0]} />
        </div>

        {/* Right top: Medium product */}
        <div className='lg:col-span-2'>
          <ProductCard product={featuredProducts[1]} />
        </div>

        {/* Right bottom: 2 small products */}
        <div>
          <ProductCard product={featuredProducts[2]} />
        </div>
        <div>
          <ProductCard product={featuredProducts[3]} />
        </div>
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

export default FeaturedShowcase;
