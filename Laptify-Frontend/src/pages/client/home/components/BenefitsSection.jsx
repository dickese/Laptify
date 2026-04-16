import React from 'react';
import { Truck, Headphones, Award } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Miễn phí vận chuyển',
      description: 'Giao hàng miễn phí cho mọi đơn hàng trên toàn quốc',
    },
    {
      icon: Headphones,
      title: 'Chăm sóc khách hàng 24/7',
      description: 'Hỗ trợ khách hàng 24 giờ/ngày 7 ngày/tuần qua nhiều kênh',
    },
    {
      icon: Award,
      title: 'Cam kết hỗ trợ tận tâm',
      description: 'Hỗ trợ tận tâm nhằm đảm bảo trải nghiệm mua sắm tốt nhất',
    },
  ];

  return (
    <div className='mb-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {benefits.map((benefit, idx) => (
          <div key={idx} className='flex flex-col items-center text-center'>
            {/* Icon */}
            <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
              <benefit.icon size={32} className='text-gray-700' />
            </div>

            {/* Title */}
            <h3 className='text-lg font-bold text-gray-900 mb-2'>
              {benefit.title}
            </h3>

            {/* Description */}
            <p className='text-sm text-gray-600'>
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
