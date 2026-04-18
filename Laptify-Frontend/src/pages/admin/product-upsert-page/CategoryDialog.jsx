import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import CustomInput from '@/components/custom/CustomInput.jsx';

export default function CategoryDialog({
  isOpen,
  onClose,
  onSubmit,
  editingVariant = null,
  mode = 'create', // 'create' or 'update'
}) {
  const [formData, setFormData] = useState({
    quantity: '',
    color: '',
    price: '',
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Initialize form data when editing
  useEffect(() => {
    if (editingVariant && mode === 'update') {
      setFormData({
        quantity: editingVariant.quantity || '',
        color: editingVariant.color || '',
        price: editingVariant.price || '',
      });
      if (editingVariant.image) {
        setPreviewImage(editingVariant.image);
      }
      if (editingVariant.images) {
        setUploadedImages(editingVariant.images);
      }
    }
  }, [editingVariant, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = {
          id: Date.now() + Math.random(),
          src: event.target.result,
          name: file.name,
        };
        setUploadedImages((prev) => [...prev, imageData]);
        // Set first uploaded image as preview
        if (!previewImage) {
          setPreviewImage(imageData.src);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
    // If removed image was preview, set next one or clear
    if (uploadedImages.length === 1) {
      setPreviewImage(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.quantity) newErrors.quantity = 'Số lượng là bắt buộc';
    if (!formData.color.trim()) newErrors.color = 'Màu sắc là bắt buộc';
    if (!formData.price) newErrors.price = 'Giá là bắt buộc';
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Giá phải là số dương';
    }
    if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Số lượng phải là số không âm';
    }


    if (uploadedImages <= 0 || uploadedImages > 4){
        newErrors.images = "Số lượng ảnh > 0 và  <= 4"
    } 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const submitData = {
      quantity: parseInt(formData.quantity),
      color: formData.color,
      price: parseFloat(formData.price),
      image: previewImage,
      images: uploadedImages,
    };

    onSubmit(submitData, mode);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFormData({
      quantity: '',
      color: '',
      price: '',
    });
    setUploadedImages([]);
    setPreviewImage(null);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white'>
          <h2 className='text-2xl font-semibold text-gray-900'>
            Thông tin phân loại
          </h2>
          <button
            onClick={onClose}
            className='p-1 hover:bg-gray-100 rounded-md transition'
          >
            <X size={24} className='text-gray-600' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          {/* Input Fields Section */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
            <CustomInput
              label='Màu sắc'
              placeholder='Nhập màu sắc'
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              error={errors.color}
            />

            <CustomInput
              label='Số lượng'
              placeholder='Nhập số lượng'
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              error={errors.quantity}
              type='number'
            />

            <CustomInput
              label='Giá (VNĐ)'
              placeholder='Nhập giá'
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              error={errors.price}
              type='number'
            />
          </div>

          {/* Upload Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Upload Area */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Tải lên
              </label>
              <label className='flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition bg-gray-50'>
                <div className='flex flex-col items-center justify-center'>
                  <Upload size={32} className='text-gray-400 mb-2' />
                  <span className='text-sm text-gray-600'>Tải ảnh lên</span>
                  <span className='text-xs text-gray-400 mt-1'>
                    hoặc kéo và thả
                  </span>
                </div>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='hidden'
                />
              </label>
            </div>

            {/* Image Preview Area */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Danh sách ảnh minh họa
                {errors.images && uploadedImages.length == 0 &&(
                  <p className='text-xs text-red-500'>{errors.images}</p>
                )}
              </label>
              <div className='grid grid-cols-2 gap-3 h-48 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50'>
                {uploadedImages.length === 0 ? (
                  <div className='col-span-2 flex items-center justify-center text-gray-400 text-sm'>
                    Chưa có ảnh nào
                  </div>
                ) : (
                  uploadedImages.map((image) => (
                    <div
                      key={image.id}
                      className='relative group rounded-lg overflow-hidden bg-white'
                    >
                      <img
                        src={image.src}
                        alt={image.name}
                        className='w-full h-24 object-cover'
                      />
                      <button
                        onClick={() => removeImage(image.id)}
                        className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'
                      >
                        <X size={20} className='text-white' />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Preview */}
          {previewImage && (
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Ảnh đại diện
              </label>
              <div className='flex justify-center'>
                <img
                  src={previewImage}
                  alt='Preview'
                  className='max-w-xs max-h-48 rounded-lg object-cover shadow-md'
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0'>
          <button
            type='button'
            onClick={() => {
              handleReset();
              onClose();
            }}
            className='px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition font-medium text-sm'
          >
            Làm mới
          </button>
          <button
            type='button'
            onClick={handleSubmit}
            className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium text-sm'
          >
            {mode === 'create' ? 'Thêm' : 'Cập nhật'}
          </button>
        </div>
      </div>
    </div>
  );
}
