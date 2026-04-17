import React from 'react';
import { Link } from 'react-router-dom';
import { searchCategories } from '@/data/mockSearchProducts';

const CategorySidebar = () => {
  return (
    <div className='w-48 bg-white h-fit'>
      <h3 className='text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200'>
        Thể loại
      </h3>
      <ul className='space-y-0'>
        {searchCategories.map((category, index) => (
          <li key={category.id} className={index < searchCategories.length - 1 ? 'border-b border-gray-200' : ''}>
            <Link
              to={`/products/search?category=${category.value}`}
              className='block text-sm text-gray-700 hover:text-red-600 transition py-3'
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
