import React, { useState } from 'react';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';

const SearchPage = () => {
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceFrom: null,
    priceTo: null,
  });

  const [searchQuery] = useState('Asus');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className='bg-gray-50 min-h-screen py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-8 text-sm text-gray-600'>
          <a href='/' className='hover:text-red-600 transition'>
            Home
          </a>
          <span>/</span>
          <span className='text-gray-800'>Tìm kiếm</span>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Left Sidebar - Filter */}
          <div className='lg:col-span-1'>
            <SearchFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Right Content - Results */}
          <div className='lg:col-span-3'>
            <SearchResults filters={filters} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
