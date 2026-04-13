import { useState } from 'react';
import { ChevronDown, Home, Box, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils.js';

export default function SideBar() {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation()

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
      subItems: [
        { label: 'Danh sách sản phẩm', path: '/admin/products' },
        { label: 'Thêm sản phẩm', path: '/admin/product-addition' },
      ],
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
                <div className='flex flex-col ml-10'>
                  {item.subItems.map((subItem, idx) => (
                    <Link
                      to={`${subItem.path}`}
                      key={idx}
                      className={cn(`w-full text-left px-4 py-2  rounded-md transition text-sm ${location.pathname === subItem.path ? 'bg-white text-black hover:bg-white':'text-gray-300 hover:text-white hover:bg-gray-800 '}`)}
                    >
                      {subItem.label}
                    </Link>
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
