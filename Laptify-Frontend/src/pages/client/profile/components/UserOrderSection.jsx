import React, { useState, useEffect } from 'react';
import OrderTable from '@/pages/admin/order-page/OrderTable';
import Pagination from '@/components/custom/Paganation';

export default function UserOrderSection({ orders = [], onDeleteOrder, onEditOrder }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-8'>
      <h2 className='text-2xl font-bold text-red-600 mb-6'>Đơn hàng đã mua</h2>

      {orders.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Bạn chưa có đơn hàng nào</p>
        </div>
      ) : (
        <>
          <OrderTable
            orders={currentOrders}
            onDelete={onDeleteOrder}
            onEdit={onEditOrder}
          />

          {totalPages > 1 && (
            <div className='mt-6 flex justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
