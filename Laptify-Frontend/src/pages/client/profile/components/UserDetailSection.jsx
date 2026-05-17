import React, { useState } from 'react';
import CustomInput from '@/components/custom/CustomInput';

export default function UserDetailSection({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (formData.newPassword || formData.currentPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
      }
      if (formData.newPassword && formData.newPassword.length < 6) {
        newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu không khớp';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onUpdate(formData);
      // Reset password fields after successful update
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-8'>
      <h2 className='text-2xl font-bold text-red-600 mb-8'>Chính sửa hộ sơ</h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Basic Info Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <CustomInput
            label='Tên'
            placeholder='Nhập tên của bạn'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <CustomInput
            label='Email'
            placeholder='Nhập email của bạn'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </div>

        {/* Password Change Section */}
        <div className='border-t pt-6'>
          <h3 className='text-lg font-semibold text-gray-700 mb-6'>Đổi mật khẩu</h3>
          <div className='space-y-6'>
            <CustomInput
              label='Mật khẩu hiện tại'
              placeholder='Nhập mật khẩu hiện tại'
              type='password'
              name='currentPassword'
              value={formData.currentPassword}
              onChange={handleInputChange}
              error={errors.currentPassword}
            />
            <CustomInput
              label='Mật khẩu mới'
              placeholder='Nhập mật khẩu mới'
              type='password'
              name='newPassword'
              value={formData.newPassword}
              onChange={handleInputChange}
              error={errors.newPassword}
            />
            <CustomInput
              label='Nhập lại mật khẩu mới'
              placeholder='Xác nhận mật khẩu mới'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-4 border-t pt-6'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition'
          >
            Hủy
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className='px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition disabled:bg-red-400 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
