import { Button } from '@/components/ui/button.jsx';
import CategoryDialog from '@/pages/admin/product-upsert-page/CategoryDialog.jsx';
import { Trash2, Edit3, Plus } from 'lucide-react';
import { useState } from 'react';

export default function CategoryTable({ variants = [], onEdit, onDelete, onAddVariant }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [dialogMode, setDialogMode] = useState('create');

  const handleOpenDialog = (variant = null) => {
    if (variant) {
      setEditingVariant(variant);
      setDialogMode('update');
    } else {
      setEditingVariant(null);
      setDialogMode('create');
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVariant(null);
  };

  const handleDialogSubmit = (data, mode) => {
    if (mode === 'create') {
      onAddVariant?.(data);
    } else {
      onEdit?.(data);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-900'>Phân loại</h2>
        <Button
          type='button'
          onClick={() => handleOpenDialog()}
          className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium text-sm'
        >
          <Plus />
          Thêm phân loại
        </Button>
      </div>

      <CategoryDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleDialogSubmit}
        editingVariant={editingVariant}
        mode={dialogMode}
      />

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-100 border-b-2 border-gray-200'>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                Màu sắc
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                Giá
              </th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                Số lượng
              </th>
              <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>
                Ảnh minh họa
              </th>
              <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {variants.length === 0 ? (
              <tr>
                <td colSpan='5' className='px-4 py-6 text-center text-gray-500'>
                  Chưa có phân loại nào
                </td>
              </tr>
            ) : (
              variants.map((variant) => (
                <tr key={variant.id} className='hover:bg-gray-50 transition'>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    {variant.color}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-700'>
                    {variant.price?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-700'>
                    {variant.quantity}
                  </td>
                  <td className='px-4 py-4 text-center'>
                    {variant.image ? (
                      <img
                        src={variant.image}
                        alt={variant.color}
                        className='w-10 h-10 rounded object-cover'
                      />
                    ) : (
                      <div className='w-10 h-10 rounded bg-gray-200 flex items-center justify-center'>
                        <span className='text-xs text-gray-400'>No Image</span>
                      </div>
                    )}
                  </td>
                  <td className='px-4 py-4 text-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <button
                        type='button'
                        onClick={() => onDelete(variant.id)}
                        className='p-2 text-red-600 hover:bg-red-50 rounded-md transition'
                        title='Xóa'
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        type='button'
                        onClick={() => handleOpenDialog(variant)}
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
