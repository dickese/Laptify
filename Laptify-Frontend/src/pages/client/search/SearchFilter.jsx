import React, { useState } from 'react';
import { searchCategories, searchBrands } from '@/data/mockSearchProducts';
import { Separator } from '@/components/ui/separator';

const SearchFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const handleApplyFilter = () => {
    onFilterChange({
      category: selectedCategory,
      brand: selectedBrand,
      priceFrom: priceFrom ? parseInt(priceFrom) : null,
      priceTo: priceTo ? parseInt(priceTo) : null,
    });
  };

  const handleClearFilter = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceFrom('');
    setPriceTo('');
    onFilterChange({
      category: '',
      brand: '',
      priceFrom: null,
      priceTo: null,
    });
  };

  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200'>
      <h2 className='text-lg font-bold mb-6'>BỘ LỌC TÌM KIẾM</h2>

      {/* Category Section */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-800 mb-3'>Danh mục</h3>
        <div className='space-y-2'>
          {searchCategories.map((cat) => (
            <label key={cat.value} className='flex items-center cursor-pointer hover:text-red-600 transition'>
              <input
                type='checkbox'
                checked={selectedCategory === cat.value}
                onChange={(e) => setSelectedCategory(e.target.checked ? cat.value : '')}
                className='w-4 h-4 rounded border-gray-300 cursor-pointer'
              />
              <span className='ml-2 text-sm text-gray-700'>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-800 mb-3'>Hãng</h3>
        <div className='space-y-2'>
          {searchBrands.map((brand) => (
            <label key={brand.value} className='flex items-center cursor-pointer hover:text-red-600 transition'>
              <input
                type='checkbox'
                checked={selectedBrand === brand.value}
                onChange={(e) => setSelectedBrand(e.target.checked ? brand.value : '')}
                className='w-4 h-4 rounded border-gray-300 cursor-pointer'
              />
              <span className='ml-2 text-sm text-gray-700'>{brand.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-800 mb-3'>Khoảng giá</h3>
        <div className='flex flex-col gap-2'>
          <input
            type='number'
            placeholder='Từ'
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className='flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600'
          />
          {/* <span className='px-2 py-2 text-gray-500 '>-</span> */}
          <Separator className='my-2' />
          <input
            type='number'
            placeholder='Đến'
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className='flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600'
          />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApplyFilter}
        className='w-full bg-red-600 text-white py-2 rounded font-semibold mb-2 hover:bg-red-700 transition'
      >
        Áp dụng
      </button>

      {/* Clear Button */}
      <button
        onClick={handleClearFilter}
        className='w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition'
      >
        XÓA TẤT CẢ
      </button>
    </div>
  );
};

export default SearchFilter;
