import { useState } from 'react';
import { ChevronDown, Home, Box, ShoppingCart } from 'lucide-react';

export default function SideBar() {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Trang chủ',
      icon: Home,
      subItems: [],
    },
    {
      id: 'products',
      label: 'Quản lý sản phẩm',
      icon: Box,
      subItems: [{ label: 'Danh sách sản phẩm' }, { label: 'Thêm sản phẩm' }],
    },
    {
      id: 'orders',
      label: 'Quản lý đơn hàng',
      icon: ShoppingCart,
      subItems: [{ label: 'Danh sách đơn hàng' }, { label: 'Đơn hàng mới' }],
    },
  ];

  const toggleMenu = (id) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  return (
    <div className='w-64 bg-gray-900 text-white h-screen overflow-y-auto fixed left-0 top-16'>
      <nav className='p-4 space-y-2'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenu === item.id;
          const hasSubItems = item.subItems.length > 0;

          return (
            <div key={item.id}>
              <button
                onClick={() => hasSubItems && toggleMenu(item.id)}
                className='w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800 rounded-md transition gap-2'
              >
                <div className='flex items-center gap-3'>
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
                {hasSubItems && (
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                )}
              </button>

              {hasSubItems && isExpanded && (
                <div className='ml-8 space-y-1 mt-1'>
                  {item.subItems.map((subItem, idx) => (
                    <button
                      key={idx}
                      className='w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition text-sm'
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
