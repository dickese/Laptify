import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='bg-gray-50 min-h-screen py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-12 mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Welcome to Exclusive
          </h1>
          <p className='text-lg text-gray-700 mb-6'>
            Discover our premium collection of laptops and computer accessories.
          </p>
          <Link
            to='/search'
            className='inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition'
          >
            Start Shopping
          </Link>
        </div>

        {/* Featured Categories */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-8'>Featured Categories</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {['Laptop', 'Tai nghe', 'Chuột', 'Bàn phím'].map((category, idx) => (
              <div
                key={idx}
                className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-gray-200'
              >
                <div className='w-20 h-20 bg-gray-200 rounded-lg mb-4'></div>
                <h3 className='font-semibold text-gray-800 mb-2'>{category}</h3>
                <p className='text-sm text-gray-600'>Browse our collection</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-white border-2 border-red-600 rounded-lg p-8 text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Looking for something specific?
          </h2>
          <Link
            to='/search'
            className='inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition'
          >
            Use Our Advanced Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
