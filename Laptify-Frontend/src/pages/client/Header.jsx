import React from 'react';
import { Search, Heart, ShoppingCart, User, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <div className='flex flex-col'>
      {/* Promo Banner */}
      <div className='bg-gray-900 text-white py-3 px-4 text-center text-sm'>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
        <span className='font-semibold cursor-pointer hover:underline'>ShopNow</span>
      </div>

      {/* Main Navigation */}
      <nav className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <div className='flex items-center justify-between mb-4'>
            {/* Brand Logo */}
            <h1 className='text-2xl font-bold tracking-wide'>Exclusive</h1>

            {/* Search Bar */}
            <div className='flex-1 mx-8'>
              <div className='flex items-center bg-gray-100 rounded-full px-4 py-2'>
                <input
                  type='text'
                  placeholder='What are you looking for?'
                  className='flex-1 bg-gray-100 outline-none text-sm'
                />
                <Search size={18} className='text-gray-600' />
              </div>
            </div>

            {/* Right Icons */}
            <div className='flex items-center gap-6'>
              <Heart size={20} className='cursor-pointer hover:fill-red-500 hover:text-red-500 transition' />
              <ShoppingCart size={20} className='cursor-pointer hover:text-red-500 transition' />
              <User size={20} className='cursor-pointer hover:text-red-500 transition' />
            </div>
          </div>

          {/* Menu Links */}
          <div className='flex items-center gap-8'>
            <a href='/' className='text-gray-700 hover:text-red-600 font-medium transition'>Home</a>
            <a href='#' className='text-gray-700 hover:text-red-600 font-medium transition'>Contact</a>
            <a href='#' className='text-gray-700 hover:text-red-600 font-medium transition'>About</a>
            <a href='#' className='text-gray-700 hover:text-red-600 font-medium transition'>Sign Up</a>

            {/* Language Selector */}
            <div className='ml-auto flex items-center gap-1 cursor-pointer text-gray-700 hover:text-red-600 transition'>
              <span className='text-sm'>English</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
