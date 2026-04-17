import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItems } from '@/feature/checkout/checkoutSlice';
import ProductImageGallery from './ProductImageGallery';
import ColorVariantSelector from './ColorVariantSelector';
import QuantitySelector from './QuantitySelector';
import ProductCard from '../ProductCard';
import { Heart, Truck, RotateCcw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initialize state
  const [quantity, setQuantity] = useState(1);
  const [currentSelectVariant, setCurrentSelectVariant] = useState(
    productDetail?.skus?.[0] || null
  );

  const [isWishlisted, setIsWishlisted] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Simulate fetching product detail by ID
    const fetchProductDetail = async (productId) => {
      const product = await fetch(`http://localhost:8080/api/v1/products/${productId}`);
      if (!product.ok) {
        setIsLoading(false);
        setIsError(true);
        return;
      }
      const data = await product.json();
      console.log("Fetched product detail: ", data);

      setProductDetail(data);
      setIsLoading(false);
    }
    fetchProductDetail(productId);
  }, [productId]);

  useEffect(() => {
    if (productDetail) {
      const fetchRelatedProducts = async (categoryId) => {
        const response = await fetch(`http://localhost:8080/api/v1/products/${productId}/related?category_id=${categoryId}&size=4`);
        const data = await response.json();
        console.log("Fetched related products: ", data);

        const relatedProducts = data.data;
        setRelatedProducts(relatedProducts);
        setCurrentSelectVariant(productDetail?.skus?.[0] || null);
      }

      fetchRelatedProducts(productDetail.categoryId);
    }
  }, [productDetail]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-96'>
        <p className='text-gray-600'>Đang tải...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center h-96'>
        <p className='text-gray-600'>Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  const handleVariantChange = (variant) => {
    setCurrentSelectVariant(variant);
    setQuantity(1);
  };

  const handleAddToCheckout = () => {
    if (!currentSelectVariant) return;

    const checkoutItem = {
      productId: productDetail.id,
      productName: productDetail.name,
      skuCode: currentSelectVariant.skuCode,
      color: currentSelectVariant.color,
      price: currentSelectVariant.price,
      quantity: quantity,
      subtotal: currentSelectVariant.price * quantity,
      image: currentSelectVariant.mediaMetadataList[0]?.url || '',
    };

    dispatch(setItems([checkoutItem]));
    navigate('/checkout');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (!productDetail) {
    console.log("Product detail is null or undefined");
    return (
      <div className='flex items-center justify-center h-96'>
        <p className='text-gray-600'>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <div className='text-sm text-gray-600 mb-6'>
        Tới khoảng / Bàn phím / {productDetail.name}
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
        {/* Product Detail Section - Left/Top */}
        <div className='flex flex-col gap-6'>
          {/* Image Gallery */}
          <ProductImageGallery images={currentSelectVariant?.mediaMetadataList || []} />
        </div>

        {/* Product Info Section - Right/Bottom */}
        <div className='flex flex-col gap-6'>
          {/* Title and Status */}
          <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>{productDetail.name}</h1>
            <div className='flex items-center gap-3'>
              <span className='text-sm text-gray-600'>{currentSelectVariant?.totalPurchases} lượt mua</span>
              <span className='text-sm bg-green-100 px-3 py-1 rounded font-medium' style={{ backgroundColor: currentSelectVariant?.stockQuantity > 0 ? '#d1fae5' : '#fef2f2', color: currentSelectVariant?.stockQuantity > 0 ? '#065f46' : '#991b1b' }}>
                {currentSelectVariant?.stockQuantity > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className='text-4xl font-bold text-red-600'>
            {formatPrice(currentSelectVariant?.price || 0)}
          </div>

          {/* Description */}
          <p className='text-gray-700 leading-relaxed'>{productDetail.description}</p>

          <Separator />

          {/* Color Variant Selector */}
          <ColorVariantSelector
            variants={productDetail.skus}
            selectedVariant={currentSelectVariant}
            onVariantChange={handleVariantChange}
          />

          {/* Quantity Selector */}
          <div className='flex items-center gap-6'>
            <span className='font-medium text-gray-800'>Số lượng:</span>
            <QuantitySelector
              quantity={quantity}
              maxQuantity={currentSelectVariant?.stockQuantity || 1}
              onQuantityChange={setQuantity}
            />
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3'>
            <button
              onClick={handleAddToCheckout}
              className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition'
            >
              Mua ngay
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`px-6 py-3 rounded border-2 transition ${isWishlisted
                ? 'border-red-600 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <Heart
                size={20}
                className={isWishlisted ? 'text-red-600 fill-red-600' : 'text-gray-600'}
              />
            </button>
          </div>

          <Separator />

          {/* Service Info Cards */}
          <div className='space-y-4'>
            <div className='flex items-start gap-4'>
              <Truck size={24} className='text-gray-600 flex-shrink-0 mt-1' />
              <div>
                <h4 className='font-semibold text-gray-800 mb-1'>Miễn phí vận chuyển</h4>
                <p className='text-sm text-gray-600'>Nhập mã bưu chính để xem lịch trình giao hàng</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <RotateCcw size={24} className='text-gray-600 flex-shrink-0 mt-1' />
              <div>
                <h4 className='font-semibold text-gray-800 mb-1'>Trả hàng</h4>
                <p className='text-sm text-gray-600'>Miễn phí trả hàng trong 30 ngày. Chi tiết</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div>
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-1 h-6 bg-red-600 rounded'></div>
          <h2 className='text-xl font-bold text-gray-800'>Các sản phẩm liên quan</h2>
        </div>

        {relatedProducts?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className='text-gray-600 text-center py-8'>Không có sản phẩm liên quan</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
