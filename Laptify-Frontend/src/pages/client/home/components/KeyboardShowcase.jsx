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
      {/* Feature Banner */}
      <div className='bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-12 flex items-center justify-between overflow-hidden relative'>
        {/* Left Content */}
        <div className='z-10 text-white flex-1'>
          <div className='text-sm font-semibold text-emerald-400 mb-2'>
            NÂNG CẤP GỎ PHÍM
          </div>
          <h2 className='text-4xl font-bold mb-8 max-w-md'>
            Nâng cấp gõ phím của bạn
          </h2>

          {/* Feature Icons */}
          <div className='flex gap-6 mb-8'>
            {features.map((feature, idx) => (
              <div key={idx} className='flex flex-col items-center gap-2'>
                <div className='w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center'>
                  <feature.icon className='text-emerald-400' size={24} />
                </div>
                <span className='text-sm text-gray-400'>{feature.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to='/products/search?category=ban-phim'
            className='inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition'
          >
            Mua ngay
          </Link>
        </div>

        {/* Right side - decorative image placeholder */}
        <div className='absolute right-0 top-1/2 -translate-y-1/2 opacity-30'>
          <div className='w-64 h-64 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full blur-3xl'></div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShowcase;
