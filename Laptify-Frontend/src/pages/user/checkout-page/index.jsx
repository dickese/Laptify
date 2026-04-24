import OrderItemSection from '@/pages/common/order-management/OrderItemSection.jsx';
import PricingSection from '@/pages/common/order-management/PricingSection.jsx';
import CustomerInfoSection from '@/pages/user/checkout-page/CustomerInfoSection.jsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCustomerInfo,
  clearCheckout,
} from '@/feature/checkout/checkoutSlice.js';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get selected items from Redux
  const cartItems = useSelector((state) => state.checkout.items);
  const customerInfoRedux = useSelector((state) => state.checkout.customerInfo);

  const [formData, setFormData] = useState(customerInfoRedux);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    // Clear error for this field
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData({
      ...formData,
      [field]: checked,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Dispatch customer info to Redux
      dispatch(setCustomerInfo(formData));

      // TODO: Call API to create order
      const orderData = {
        customerInfo: formData,
        items: cartItems,
        total: total,
      };

      console.log('Placing order:', orderData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear checkout and navigate with order data
      dispatch(clearCheckout());
      navigate('/order-success', {
        state: {
          orderData: {
            items: cartItems,
            total: total,
            subtotal: subtotal,
            shipping: shipping,
            customerInfo: formData,
            orderNumber: '#' + Math.random().toString(36).substr(2, 6).toUpperCase(),
          },
        },
      });
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Đặt hàng thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <p className='text-gray-600 mb-4'>Giỏ hàng trống</p>
        <button
          onClick={() => navigate('/cart')}
          className='text-red-500 hover:text-red-600 font-semibold'
        >
          Quay lại giỏ hàng
        </button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>
        Chi tiết hóa đơn
      </h1>

      {/* Customer Info Section */}
      <CustomerInfoSection
        formData={formData}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        errors={errors}
      />

      {/* Order Items Section */}
      <OrderItemSection items={cartItems} />

      {/* Pricing Section */}
      <PricingSection subtotal={subtotal} shipping={shipping} total={total} />

      {/* Checkout Button */}
      <div className='flex justify-end mb-6'>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className='bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition duration-200'
        >
          {loading ? 'Đang xử lý...' : 'Đặt hàng'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
