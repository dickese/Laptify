import CustomInput from "@/components/custom/CustomInput.jsx";
import CustomSelect from "@/components/custom/CustomSelect.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function ProductFilter({
  filters,
  onFilterChange,
  onSearch,
  onClear,
  categories = [],
  manufacturers = [],
}) {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
      <h3 className='text-lg font-semibold text-red-600 mb-4'>
        Tìm kiếm sản phẩm
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div className='space-y-4'>
          <CustomInput
            label='Mã sản phẩm'
            placeholder='Nhập mã sản phẩm'
            value={filters.productCode}
            onChange={(e) => onFilterChange('productCode', e.target.value)}
          />
          <CustomSelect
            label='Danh mục'
            placeholder='Chọn danh mục'
            value={filters.category}
            onChange={(value) => onFilterChange('category', value)}
            options={categories}
          />
        </div>

        <div className='space-y-4'>
          <CustomInput
            label='Tên sản phẩm'
            placeholder='Nhập tên sản phẩm'
            value={filters.productName}
            onChange={(e) => onFilterChange('productName', e.target.value)}
          />
          <CustomSelect
            label='Hãng sản xuất'
            placeholder='Chọn hãng sản xuất'
            value={filters.manufacturer}
            onChange={(value) => onFilterChange('manufacturer', value)}
            options={manufacturers}
          />
        </div>
      </div>

      <div className='flex gap-4 justify-end'>
        <Button
          onClick={onClear}
          variant="secondary"
          className='px-6 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-300 transition font-medium'
        >
          Làm mới
        </Button>
        <Button
          onClick={onSearch}
          className='px-8 py-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
