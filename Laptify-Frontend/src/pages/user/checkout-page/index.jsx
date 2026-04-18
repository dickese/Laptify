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
import { Button } from '@/components/ui/button.jsx';
import { createOrder } from '@/services/orderApi.js';
import { toast } from 'sonner';

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
      dispatch(setCustomerInfo(formData));

      const orderCreationRequest = {
        customer: {
          name: formData.fullName,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          isSaved: formData.isSaved || false,
        },
        products: cartItems.map((item) => ({
          productId: item.id,
          skuCode: item.variant,
          quantity: item.quantity,
        })),
      };

      const formDataRequest = new FormData();
      formDataRequest.append(
        'orderCreationRequest',
        JSON.stringify(orderCreationRequest)
      );

      console.log('Placing order:', orderCreationRequest);

      await createOrder(formDataRequest);
      dispatch(clearCheckout());
      navigate('/order-success');

    } catch (error) {
      toast.error(error, 'Đặt hàng thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <p className='text-gray-600 mb-4'>
          Không tìm thấy thông tin thanh toán
        </p>
        <Button
          onClick={() => navigate('/cart')}
          className='bg-orange-700 font-semibold cursor-pointer'
        >
          Quay lại giỏ hàng
        </Button>
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
