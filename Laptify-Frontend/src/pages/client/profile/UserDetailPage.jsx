import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserDetailSection from './components/UserDetailSection';

export default function UserDetailPage() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleUpdateProfile = async (formData) => {
    try {
      // TODO: Replace with actual API call
      // await userService.updateProfile(formData);
      console.log('Updating profile:', formData);
      // Show success message
      alert('Cập nhật hồ sơ thành công!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Cập nhật hồ sơ thất bại!');
    }
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
            <span className='text-gray-900 font-medium'>Hồ sơ của tôi</span>
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
                  className='w-full text-left px-4 py-2 rounded-md transition bg-red-50 text-red-600 font-medium'
                >
                  Hộ sơ của tôi
                </button>
                <button
                  onClick={() => navigate('/order-history')}
                  className='w-full text-left px-4 py-2 rounded-md transition text-gray-700 hover:bg-gray-50'
                >
                  Lịch sử mua hàng
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='lg:col-span-3'>
            <UserDetailSection user={user} onUpdate={handleUpdateProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}
