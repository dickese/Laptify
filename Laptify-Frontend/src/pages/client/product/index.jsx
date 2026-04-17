import { useEffect, useMemo, useState } from 'react';
import ProductList from './ProductList';
import { useLocation } from 'react-router-dom';

const ProductPage = ({ title }) => {
  const location = useLocation();
  const page = location.search ? new URLSearchParams(location.search).get('page') : 1;
  const productType = location.pathname.replace(/\/$/, '');

  const endpoint = productType ? `http://localhost:8080/api/v1${productType}` : 'http://localhost:8080/api/v1/products/news';

  const [productResponse, setProductResponse] = useState({
    products: [],
    totalPages: 1,
  });

  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const itemsPerPage = 20;

  const [sortBy, setSortBy] = useState('relevant');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = new URL(endpoint);
        url.searchParams.append('page', currentPage - 1);
        url.searchParams.append('size', itemsPerPage);

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
  }, [endpoint, currentPage]);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const url = new URL(window.location);
    url.searchParams.set('page', newPage);
    window.history.pushState({}, '', url);
  }

  return (
    <div className='bg-gray-50 min-h-screen py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-8 text-sm text-gray-600'>
          <a href='/' className='hover:text-red-600 transition'>
            Home
          </a>
          <span>/</span>
          <span className='text-gray-800'>{title}</span>
        </div>

        <div className='lg:col-span-3'>
          <ProductList
            products={sortedProducts}
            title={title}
            currentPage={currentPage}
            totalPages={productResponse.totalPages}
            sortBy={sortBy}
            onPageChange={handlePageChange}
            onSortChange={setSortBy} />
        </div>
      </div>
    </div >
  );
};

export default ProductPage;
