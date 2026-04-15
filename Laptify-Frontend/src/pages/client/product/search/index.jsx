import React, { useEffect, useMemo, useState } from 'react';
import SearchFilter from './SearchFilter';
import { useLocation } from 'react-router-dom';
import ProductList from '../ProductList';

const SearchPage = () => {
  const location = useLocation();
  const productType = location.pathname;

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('keyword');

  const endpoint = productType ? `http://localhost:8080/api/v1${productType}` : 'http://localhost:8080/api/v1/products/news';

  const [productResponse, setProductResponse] = useState({
    products: [],
    totalPages: 1,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceFrom: null,
    priceTo: null,
  });

  const [sortBy, setSortBy] = useState('relevant');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = new URL(endpoint);
        url.searchParams.append('page', currentPage - 1);
        url.searchParams.append('size', itemsPerPage);

        if (filters.category) url.searchParams.append('categoryId', filters.category);
        if (filters.brand) url.searchParams.append('brandCode', filters.brand);
        if (filters.priceFrom) url.searchParams.append('minPrice', filters.priceFrom);
        if (filters.priceTo) url.searchParams.append('maxPrice', filters.priceTo);
        if (searchQuery) url.searchParams.append('keyword', searchQuery);

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log("fetching data: ", data);
        setProductResponse(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProduct();
  }, [endpoint, currentPage, filters, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!productResponse.data) return [];

    const sorted = [...productResponse.data];
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'newest':
        return sorted.reverse();
      case 'bestseller':
        return sorted.sort((a, b) => b.purchaseCount - a.purchaseCount);
      case 'relevant':
      default:
        return sorted;
    }
  }, [sortBy, productResponse.data]);

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
            <ProductList
              products={sortedProducts}
              title={"a"}
              currentPage={currentPage}
              totalPages={productResponse.totalPages}
              sortBy={sortBy}
              onPageChange={setCurrentPage}
              onSortChange={setSortBy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
