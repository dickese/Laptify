import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import OrderItemSection from '@/pages/common/order-management/OrderItemSection.jsx';
import PricingSection from '@/pages/common/order-management/PricingSection.jsx';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order data from location state (passed from checkout page)
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
      setLoading(false);
    } else {
      // If no order data, redirect to home
      console.log('[v0] No order data found, redirecting to home');
      navigate('/');
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <p className='text-gray-600'>Đang tải...</p>
      </div>
    );
  }

  if (!orderData) {
    return null;
  }

  const { items = [], total = 0, subtotal = 0, shipping = 0, orderNumber = '#B6CT3' } = orderData;

  const handleViewDetails = () => {
    navigate('/order-details', { state: { orderData } });
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4'>
      <div className='max-w-2xl mx-auto'>
        {/* Success Header */}
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-6'>
            <div className='bg-green-100 rounded-full p-3'>
              <CheckCircle size={56} className='text-green-500' />
            </div>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            Cảm ơn bạn đã mua hàng
          </h1>
          <p className='text-gray-600 mb-2'>
            Chúng tôi đã nhận được đơn hàng của bạn sẽ giao trong 5-7 ngày làm việc.
          </p>
          <p className='text-gray-700 font-semibold'>
            Mã đơn hàng của bạn: <span className='text-red-600'>{orderNumber}</span>
          </p>
        </div>

        {/* Order Summary */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-6'>
            Tóm tắt đơn hàng
          </h2>

          {/* Order Items */}
          {items.length > 0 && (
            <div className='mb-6'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-gray-300'>
                      <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                        Sản phẩm
                      </th>
                      <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                        Giá
                      </th>
                      <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                        Số lượng
                      </th>
                      <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                        Tổng cộng
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {items.map((item) => (
                      <tr key={item.id} className='hover:bg-gray-50'>
                        <td className='px-4 py-4 text-sm text-gray-900'>
                          {item.productName}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-700'>
                          {item.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-700'>
                          {item.quantity}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-900 font-semibold'>
                          {item.subtotal.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pricing */}
          <PricingSection
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            showShipping={true}
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 justify-center'>
          <button
            onClick={handleBackHome}
            className='px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition duration-200'
          >
            Quay lại trang chủ
          </button>
          <button
            onClick={handleViewDetails}
            className='px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200'
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
