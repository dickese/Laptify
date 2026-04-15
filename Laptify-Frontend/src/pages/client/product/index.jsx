import ProductList from './ProductList';

const ProductPage = ({ type, title }) => {
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
          <ProductList type={type} title={title} />
        </div>
      </div>
    </div >
  );
};

export default ProductPage;
