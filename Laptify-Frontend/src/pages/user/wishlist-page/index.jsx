import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../../common/product/ProductList';
import { userProductSortOptions } from '@/data/mockSearchProducts';
import { useSelector } from 'react-redux';

const UserWishlistPage = () => {
  const location = useLocation();
  const page = location.search ? new URLSearchParams(location.search).get('page') : 1;

  const endpoint = 'http://localhost:8080/api/v1/wishlists/products';
  const [userWishlistResponse, setUserWishlistResponse] = useState({
    products: [],
    totalPages: 1,
  });

  const totalWishlistProducts = useSelector((state) => state.wishlist.total);

  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const itemsPerPage = 20;

  const [sortBy, setSortBy] = useState('addedDate');

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
        setUserWishlistResponse(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProduct();
  }, [endpoint, currentPage]);

  // Sort products
  const sortedWishlistProducts = useMemo(() => {
    if (!userWishlistResponse.data) return [];

    const sorted = [...userWishlistResponse.data];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted;
      case 'bestseller':
        return sorted.sort((a, b) => b.totalPurchases - a.totalPurchases);
      case 'addedDate':
      default:
        return sorted;
    }
  }, [sortBy, userWishlistResponse.data]);

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
          <span className='text-gray-800'>Sản phẩm yêu thích</span>
        </div>

        <div className='lg:col-span-3'>
          <ProductList
            products={sortedWishlistProducts.map((wishlistProduct) => wishlistProduct.product)}
            title={`Sản phẩm yêu thích: ${totalWishlistProducts}`}
            currentPage={currentPage}
            totalPages={userWishlistResponse.totalPages}
            sortOptions={userProductSortOptions}
            sortBy={sortBy}
            onPageChange={handlePageChange}
            onSortChange={setSortBy} />
        </div>
      </div>
    </div >
  );
};

export default UserWishlistPage;
