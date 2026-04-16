import React from 'react';
import { Link } from 'react-router-dom';
import { searchCategories } from '@/data/mockSearchProducts';

const CategorySidebar = () => {
  return (
    <div className='w-48 bg-white rounded-lg border border-gray-200 p-6 h-fit'>
      <h3 className='text-lg font-bold text-gray-900 mb-6'>Danh mục</h3>
      <ul className='space-y-3'>
        {searchCategories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/products/search?category=${category.value}`}
              className='text-gray-700 hover:text-red-600 hover:font-semibold transition text-sm'
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
