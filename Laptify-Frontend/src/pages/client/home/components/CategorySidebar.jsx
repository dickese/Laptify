import React from 'react';
import { Link } from 'react-router-dom';
import { searchCategories } from '@/data/mockSearchProducts';

const CategorySidebar = () => {
  return (
    <div className='w-48'>
      <ul className='space-y-0'>
        {searchCategories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/products/search?category=${category.value}`}
              className='block text-gray-900 hover:text-red-600 transition py-2 text-base'
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
