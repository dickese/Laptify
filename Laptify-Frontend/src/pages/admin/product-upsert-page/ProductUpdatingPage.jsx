import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductInfo from './ProductInfo.jsx';
import CategoryTable from './CategoryTable.jsx';
import { categories, brands, mockProducts } from '@/data/mockProducts.js';
import { Button } from '@/components/ui/button.jsx';

const ProductUpdatingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    totalQuantity: '',
    brandId: '',
    categoryId: '',
    description: '',
  });

  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching product data by ID
    const product = mockProducts.find((p) => p.id === parseInt(id));
    if (product) {
      setFormData({
        code: product.code,
        name: product.name,
        totalQuantity: product.quantity,
        brandId: product.brandId || '',
        categoryId: product.categoryId || '',
        description: product.description,
      });

      // Mock variants data
      setVariants([
        {
          id: 1,
          color: 'Đỏ',
          price: 210000000,
          quantity: 2,
          image: 'https://via.placeholder.com/40',
        },
        {
          id: 2,
          color: 'Xanh lam',
          price: 210000000,
          quantity: 2,
          image: 'https://via.placeholder.com/40',
        },
        {
          id: 3,
          color: 'Xanh dương',
          price: 210000000,
          quantity: 2,
          image: 'https://via.placeholder.com/40',
        },
      ]);
    }
    setLoading(false);
  }, [id]);

  const handleInputChange = (field, value) => {
    // Don't allow editing of code and totalQuantity
    if (field === 'code' || field === 'totalQuantity') {
      return;
    }

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
    console.log('[v0] Updated form data:', formData);
    console.log('[v0] Updated variants:', variants);
    // API call will be implemented later
    alert('Cập nhật sản phẩm thành công!');
    navigate('/admin/products');
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-gray-500'>Đang tải dữ liệu...</p>
      </div>
    );
  }

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
          <h1 className='text-3xl font-bold text-gray-900'>Quản lý sản phẩm</h1>
          <p className='text-gray-500 text-sm'>Cập nhật sản phẩm</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Product Info Section */}
        <ProductInfo
          mode='updating'
          formData={formData}
          onInputChange={handleInputChange}
          categories={categories}
          brands={brands}
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
            Hủy
          </button>
          <button
            type='submit'
            className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
          >
            Cập nhật sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdatingPage;
