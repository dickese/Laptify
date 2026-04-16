import React from 'react';
import CategorySidebar from './components/CategorySidebar';
import FeaturedShowcase from './components/FeaturedShowcase';
import BestSellingSection from './components/BestSellingSection';
import KeyboardShowcase from './components/KeyboardShowcase';
import TrendingProductsSection from './components/TrendingProductsSection';
import BenefitsSection from './components/BenefitsSection';

const HomePage = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {/* Section 1: Hero + Category Sidebar */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12'>
          {/* Category Sidebar */}
          <CategorySidebar />

          {/* Hero Banner */}
          <div className='lg:col-span-3'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 md:p-12 h-full flex items-center justify-between overflow-hidden relative'>
              <div className='z-10 text-white flex-1'>
                <div className='text-sm font-semibold text-red-500 mb-2'>
                  ROG WING STING SCAL
                </div>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                  Voucher giảm đến 10%
                </h2>
                <button className='bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition'>
                  Mua ngay
                </button>
              </div>

              {/* Decorative element */}
              <div className='absolute right-0 top-0 opacity-20 text-white text-6xl font-bold'>
                ⚡
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Featured Showcase */}
        <FeaturedShowcase />

        {/* Section 3: Best Selling Products */}
        <BestSellingSection />

        {/* Section 4: Keyboard Showcase */}
        <KeyboardShowcase />

        {/* Section 5: Trending/Random Products */}
        <TrendingProductsSection />

        {/* Section 6: Benefits */}
        <BenefitsSection />
      </div>
    </div>
  );
};

export default HomePage;
