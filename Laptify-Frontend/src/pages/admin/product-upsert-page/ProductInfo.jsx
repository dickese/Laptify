import CustomArea from '@/components/custom/CustomArea.jsx';
import CustomInput from '@/components/custom/CustomInput.jsx';
import CustomSelect from '@/components/custom/CustomSelect.jsx';

export default function ProductInfo({
  mode = 'addition', // 'addition' or 'updating'
  formData,
  onInputChange,
  categories = [],
  brands = [],
}) {
  const isAdditionMode = mode === 'addition';

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6 space-y-4'>
      <h2 className='text-xl font-semibold text-gray-900 mb-6'>
        Thông tin sản phẩm
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Product Code - Only in Updating Mode */}
        {!isAdditionMode && (
          <CustomInput
            label='Mã sản phẩm'
            placeholder='Mã sản phẩm'
            value={formData.code || ''}
            onChange={(e) => onInputChange('code', e.target.value)}
            disabled={true}
          />
        )}

        {/* Product Name */}
        <CustomInput
          label={isAdditionMode ? 'Tên sản phẩm' : 'Tên sản phẩm'}
          placeholder='Tên sản phẩm'
          value={formData.name || ''}
          onChange={(e) => onInputChange('name', e.target.value)}
        />

        {/* Total Quantity - Only in Updating Mode, Disabled */}
        {!isAdditionMode && (
          <CustomInput
            label='Số lượng'
            placeholder='Số lượng'
            value={formData.totalQuantity || ''}
            onChange={(e) => onInputChange('totalQuantity', e.target.value)}
            disabled={true}
          />
        )}

        {/* Brand / Manufacturer */}
        <CustomSelect
          type='button'
          label='Hãng sản xuất'
          placeholder='Chọn hãng sản xuất'
          options={brands}
          value={formData.brandId || ''}
          onChange={(value) => onInputChange('brandId', value)}
        />

        {/* Category */}
        <CustomSelect
          type='button'
          label='Danh mục'
          placeholder='Chọn danh mục'
          options={categories}
          value={formData.categoryId || ''}
          onChange={(value) => onInputChange('categoryId', value)}
        />
      </div>

      <div className=''>
        <CustomArea
          label={'Mô tả'}
          placeholder={'Viết một đoạn mô tả ngắn về sản phẩm'}
          value={formData.description || ''}
          onChange={(e) => onInputChange('description', e.target.value)}
        />
      </div>
    </div>
  );
}
