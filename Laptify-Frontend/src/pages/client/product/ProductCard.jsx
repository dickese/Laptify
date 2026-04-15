import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className='bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition group'>
      {/* Image Container */}
      <div className='relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-full object-cover group-hover:scale-105 transition'
        />

        {/* Wishlist & Cart Icons */}
        <div className='absolute top-3 right-3 flex flex-col gap-2'>
          <button className='bg-white rounded-full p-2 shadow hover:bg-red-600 hover:text-white transition'>
            <Heart size={18} />
          </button>
          <button className='bg-white rounded-full p-2 shadow hover:bg-red-600 hover:text-white transition'>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className='p-4'>
        <h3 className='font-semibold text-gray-800 text-sm line-clamp-2 mb-2 group-hover:text-red-600 transition'>
          {product.name}
        </h3>

        {/* Price */}
        <div className='mb-2'>
          <p className='text-red-600 font-bold text-2xl'>{formatPrice(product.price)}</p>
        </div>

        {/* Purchase Count */}
        <p className='text-gray-600 text-xs'>{product.totalPurchases} lượt mua</p>
      </div>
    </div>
  );
};

export default ProductCard;
