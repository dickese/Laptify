import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserOrderSection from './components/UserOrderSection';

export default function UserOrderPage() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch user orders (mock - replace with actual API call)
  useEffect(() => {
    if (user) {
      // TODO: Replace with actual API call to fetch user orders
      // fetchUserOrders(user.id);
      setUserOrders([]);
    }
  }, [user]);

  const handleDeleteOrder = async (orderId) => {
    try {
      // TODO: Replace with actual API call
      // await orderService.deleteOrder(orderId);
      setUserOrders((prev) => prev.filter((order) => order.id !== orderId));
      console.log('Order deleted:', orderId);
      alert('Xóa đơn hàng thành công!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Xóa đơn hàng thất bại!');
    }
  };

  const handleEditOrder = (orderId) => {
    // TODO: Navigate to order detail page or open edit modal
    console.log('Edit order:', orderId);
    navigate(`/order-detail-page/${orderId}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <a href='/' className='hover:text-gray-900 transition'>
              Trang chủ
            </a>
            <span>/</span>
            <span className='text-gray-900 font-medium'>Lịch sử mua hàng</span>
          </div>
          <div className='text-sm text-gray-600'>
            Chào mừng! <span className='text-red-600 font-medium'>{user.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-md p-6 sticky top-8'>
              <nav className='space-y-2'>
                <button
                  onClick={() => navigate('/profile')}
                  className='w-full text-left px-4 py-2 rounded-md transition text-gray-700 hover:bg-gray-50'
                >
                  Hộ sơ của tôi
                </button>
                <button
                  onClick={() => navigate('/order-history')}
                  className='w-full text-left px-4 py-2 rounded-md transition bg-red-50 text-red-600 font-medium'
                >
                  Lịch sử mua hàng
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='lg:col-span-3'>
            <UserOrderSection
              orders={userOrders}
              onDeleteOrder={handleDeleteOrder}
              onEditOrder={handleEditOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
