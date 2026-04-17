import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AdvertisementCard = ({ title, subtitle, image, buttonText, buttonLink }) => {
  return (
    <Link
      to={buttonLink}
      className='bg-gray-900 rounded-lg p-6 md:p-8 text-white flex flex-col justify-between h-full hover:shadow-lg transition overflow-hidden group'
    >
      <div className='flex-1'>
        <h3 className='text-2xl md:text-3xl font-bold mb-2 group-hover:text-red-400 transition'>
          {title}
        </h3>
        <p className='text-sm text-gray-300 mb-4'>{subtitle}</p>
        <button className='text-red-500 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition'>
          {buttonText}
          <ArrowRight size={16} />
        </button>
      </div>
      <div className='flex items-center justify-center mt-4 opacity-60 group-hover:opacity-100 transition'>
        {image && (
          <div className='w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center'>
            <span className='text-sm text-gray-500'>{image}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

const FeaturedShowcase = () => {
  const advertisementCards = [
    {
      title: 'Lenovo Legion 5',
      subtitle: 'High performance gaming laptop',
      image: '🖥️',
      buttonText: 'Xem ngay',
      buttonLink: '/products/search',
    },
    {
      title: 'AULA F75',
      subtitle: 'Mechanical keyboard with RGB',
      image: '⌨️',
      buttonText: 'Xem ngay',
      buttonLink: '/products/search',
    },
    {
      title: 'Soundpeast',
      subtitle: 'Premium wireless headphones',
      image: '🎧',
      buttonText: 'Xem ngay',
      buttonLink: '/products/search',
    },
    {
      title: 'Logitech Mouse',
      subtitle: 'Precision gaming mouse',
      image: '🖱️',
      buttonText: 'Xem ngay',
      buttonLink: '/products/search',
    },
  ];

  return (
    <div className='mb-12'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='w-1 h-6 bg-red-600 rounded-full'></div>
          <h2 className='text-lg font-bold text-gray-900'>Sản phẩm mới</h2>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        {advertisementCards.map((card, index) => (
          <AdvertisementCard key={index} {...card} />
        ))}
      </div>

      {/* View All Button */}
      <div className='text-center'>
        <button className='bg-red-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-red-700 transition'>
          Xem tất cả
        </button>
      </div>
    </div>
  );
};

export default FeaturedShowcase;
