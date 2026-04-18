import { Trash2, Edit3 } from 'lucide-react';

export default function ProductTable({
  products,
  onDelete,
  onEdit,
  currentPage,
  itemsPerPage,
}) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-red-600 text-white'>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Mã sản phẩm
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Tên sản phẩm
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Danh mục
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Hãng sản xuất
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Số lượng
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold'>
                Giá hiển thị
              </th>
              <th className='px-6 py-3 text-center text-sm font-semibold'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan='7' className='px-6 py-4 text-center text-gray-500'>
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              currentItems.map((product) => (
                <tr key={product.id} className='hover:bg-gray-50 transition'>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {product.id}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {product.name}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {product.category}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {product.manufacturer}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {product.quantity}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {product.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <button
                        onClick={() => onDelete(product.id)}
                        className='p-2 text-red-600 hover:bg-red-50 rounded-md transition'
                        title='Xóa'
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => onEdit(product.id)}
                        className='p-2 text-gray-600 hover:bg-gray-100 rounded-md transition'
                        title='Chỉnh sửa'
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
