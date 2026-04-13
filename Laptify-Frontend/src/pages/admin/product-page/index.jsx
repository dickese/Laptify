import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Pagination from '@/components/custom/Paganation.jsx';
import ProductTable from '@/pages/admin/product-page/ProductTable.jsx';
import ProductFilter from '@/pages/admin/product-page/ProductFilter.jsx';
import { mockProducts, categories, manufacturers } from '@/data/mockProducts.js';


const ProductManagementPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    productCode: '',
    productName: '',
    category: '',
    manufacturer: '',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleSearch = () => {
    const filtered = products.filter((product) => {
      const matchCode =
        filters.productCode === '' ||
        product.code.toLowerCase().includes(filters.productCode.toLowerCase());
      const matchName =
        filters.productName === '' ||
        product.name.toLowerCase().includes(filters.productName.toLowerCase());
      const matchCategory =
        filters.category === '' ||
        product.category.toLowerCase().includes(filters.category.toLowerCase());
      const matchManufacturer =
        filters.manufacturer === '' ||
        product.manufacturer
          .toLowerCase()
          .includes(filters.manufacturer.toLowerCase());

      return matchCode && matchName && matchCategory && matchManufacturer;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({
      productCode: '',
      productName: '',
      category: '',
      manufacturer: '',
    });
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      setFilteredProducts(
        updated.filter((product) => {
          const matchCode =
            filters.productCode === '' ||
            product.code
              .toLowerCase()
              .includes(filters.productCode.toLowerCase());
          const matchName =
            filters.productName === '' ||
            product.name
              .toLowerCase()
              .includes(filters.productName.toLowerCase());
          const matchCategory =
            filters.category === '' ||
            product.category
              .toLowerCase()
              .includes(filters.category.toLowerCase());
          const matchManufacturer =
            filters.manufacturer === '' ||
            product.manufacturer
              .toLowerCase()
              .includes(filters.manufacturer.toLowerCase());

          return matchCode && matchName && matchCategory && matchManufacturer;
        })
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/product-updating/${id}`);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>
        Quản lý sản phẩm
      </h1>

      <ProductFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Danh sách sản phẩm
        </h2>
        <button
          onClick={() => navigate('/admin/product-addition')}
          className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium'
        >
          Thêm sản phẩm
        </button>
      </div>

      <ProductTable
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        categories={categories}
        manufacturers={manufacturers}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductManagementPage;
