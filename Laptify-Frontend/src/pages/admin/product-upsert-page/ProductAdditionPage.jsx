import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus } from 'lucide-react';
import ProductInfo from './ProductInfo.jsx';
import CategoryTable from './CategoryTable.jsx';
import { categories, manufacturers } from '@/data/mockProducts.js';
import { Button } from '@/components/ui/button.jsx';

const ProductAdditionPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    category: '',
  });

  const [variants, setVariants] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVariantAdd = (variantData) => {
    setVariants((prev) => [...prev, { ...variantData, id: Date.now() }]);
  };

  const handleVariantEdit = (updatedVariant) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === updatedVariant.id ? updatedVariant : v))
    );
  };

  const handleVariantDelete = (variantId) => {
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[v0] Form data:', formData);
    console.log('[v0] Variants:', variants);
    // API call will be implemented later
    alert('Thêm sản phẩm thành công!');
    navigate('/admin/products');
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div>
      {/* Header */}
      <div className='flex items-center gap-4 mb-6'>
        <button
          onClick={handleCancel}
          className='p-2 hover:bg-gray-100 rounded-md transition'
          title='Quay lại'
        >
          <ChevronLeft size={24} className='text-gray-700' />
        </button>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Quản lý sản phẩm
          </h1>
          <p className='text-gray-500 text-sm'>Thêm sản phẩm</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Product Info Section */}
        <ProductInfo
          mode='addition'
          formData={formData}
          onInputChange={handleInputChange}
          categories={categories}
          manufacturers={manufacturers}
        />

        {/* Category Table Section */}
        <CategoryTable
          variants={variants}
          onAddVariant={handleVariantAdd}
          onEdit={handleVariantEdit}
          onDelete={handleVariantDelete}
        />

        {/* Action Buttons */}
        <div className='flex items-center justify-end gap-3'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition font-medium'
          >
            Làm mới
          </button>
          <Button
            type='submit'
            className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
          >
            Thêm sản phẩm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdditionPage;
