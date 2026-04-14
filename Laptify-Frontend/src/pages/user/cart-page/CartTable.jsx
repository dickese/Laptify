import { Trash2 } from 'lucide-react';

export default function CartTable({
  items = [],
  selectedItems = [],
  onSelectItem,
  onSelectAll,
  onDeleteItem,
  onQuantityChange,
}) {
  const allItemsSelected =
    items.length > 0 && selectedItems.length === items.length;
  const someItemsSelected =
    selectedItems.length > 0 && selectedItems.length < items.length;

  const handleSelectAll = (e) => {
    onSelectAll(e.target.checked);
  };

  const handleSelectItem = (itemId) => {
    onSelectItem(itemId);
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-50 border-b border-gray-200'>
              <th className='px-4 py-4 text-left'>
                <input
                  type='checkbox'
                  checked={allItemsSelected}
                  indeterminate={someItemsSelected}
                  onChange={handleSelectAll}
                  className='w-5 h-5 cursor-pointer checked:bg-orange-600'
                />
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                Sản phẩm
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                Giá
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                Số lượng
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                Tổng tiền
              </th>
              <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {items.length === 0 ? (
              <tr>
                <td colSpan='6' className='px-6 py-8 text-center text-gray-500'>
                  Giỏ hàng trống
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className='hover:bg-gray-50 transition'>
                  <td className='px-4 py-4'>
                    <input
                      type='checkbox'
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className='w-5 h-5 cursor-pointer'
                    />
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    <div className='flex items-center gap-3'>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.productName}
                          className='w-12 h-12 object-cover rounded'
                        />
                      )}
                      <div>
                        <p className='font-medium text-gray-900'>
                          {item.productName}
                        </p>
                        {item.variant && (
                          <p className='text-xs text-gray-500'>
                            {item.variant}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-700'>
                    {item.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex items-center border border-gray-300 rounded-md w-24'>
                      <button
                        onClick={() =>
                          onQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className='px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        −
                      </button>
                      <span className='flex-1 text-center text-sm font-medium'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onQuantityChange(item.id, item.quantity + 1)
                        }
                        className='px-2 py-1 text-gray-600 hover:bg-gray-100'
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className='px-4 py-4 text-sm font-semibold text-gray-900'>
                    {(item.price * item.quantity).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className='px-4 py-4 text-center'>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded-md transition'
                      title='Xóa'
                    >
                      <Trash2 size={18} />
                    </button>
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
