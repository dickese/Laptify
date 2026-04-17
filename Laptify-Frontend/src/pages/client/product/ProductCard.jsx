import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    // TODO: Implement wishlist functionality
    console.log('Wishlist clicked for product:', product.id);
  }

  const handleCartClick = (e) => {
    e.stopPropagation();

    //  TODO: Implement add to cart functionality
    console.log('Add to cart clicked for product:', product.id);
  }

  console.log("Rendering ProductCard for product: ", product);

  return (
    <div
      onClick={handleCardClick}
      className='bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition group cursor-pointer'
    >
      {/* Image Container */}
      <div className='relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-full object-cover group-hover:scale-105 transition'
        />

        {/* Wishlist & Cart Icons */}
        <div className='absolute top-3 right-3 flex flex-col gap-2'>
          <button
            onClick={handleWishlistClick}
            className='bg-white rounded-full p-2 shadow hover:bg-red-600 hover:text-white transition'
          >
            <Heart size={18} />
          </button>
          <button
            onClick={handleCartClick}
            className='bg-white rounded-full p-2 shadow hover:bg-red-600 hover:text-white transition'
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        {/* Out of Stock Badge */}
        {product.stockQuantity == 0 && (
          console.log("Product is out of stock: ", product),
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='bg-black rounded-full w-24 h-24 flex items-center justify-center shadow-lg border-4 border-white'>
              <p className='text-white font-bold text-center'>Hết hàng</p>
            </div>
          </div>
        )}
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
