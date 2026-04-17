import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sliders, Music, Palette } from 'lucide-react';

const KeyboardShowcase = () => {
  const features = [
    { icon: Zap, label: 'Hiệu suất' },
    { icon: Sliders, label: 'Tùy chỉnh' },
    { icon: Music, label: 'Âm thanh' },
    { icon: Palette, label: 'LED RGB' },
  ];

  return (
    <div className='mb-12'>
      {/* Black Advertisement Banner */}
      <div className='bg-black rounded-lg p-8 md:p-12 lg:p-16 flex items-center justify-between overflow-hidden'>
        {/* Left Content */}
        <div className='text-white flex-1 max-w-md'>
          <div className='text-xs font-semibold text-emerald-400 mb-2 tracking-widest'>
            NÂNG CẤP GỎ PHÍM
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>
            Nâng cấp gõ phím của bạn
          </h2>

          {/* Feature Icons */}
          <div className='flex gap-4 mb-8'>
            {features.map((feature, idx) => (
              <div key={idx} className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border border-gray-700'>
                <feature.icon className='text-emerald-400' size={20} />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to='/products/search'
            className='inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition'
          >
            Mua ngay
          </Link>
        </div>

        {/* Right side - keyboard image placeholder */}
        <div className='hidden lg:flex items-center justify-center flex-1'>
          <div className='w-80 h-48 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700'>
            <span className='text-gray-500 text-sm'>Keyboard Image</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShowcase;
