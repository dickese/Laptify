import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import CartTable from '@/pages/user/cart-page/CartTable.jsx';
import PricingSection from '@/pages/common/order-management/PricingSection.jsx';

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    productName: 'ASUS FHD Gaming Laptop',
    variant: 'Màu Đỏ',
    price: 29000000,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    productName: 'ASUS FHD Gaming Laptop',
    variant: 'Màu Xanh lam',
    price: 29000000,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    productName: 'ASUS FHD Gaming Laptop',
    variant: 'Màu Tím',
    price: 29000000,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedItems, setSelectedItems] = useState([]);

  // Calculate totals based on selected items
  const calculateTotals = () => {
    if (selectedItems.length === 0) {
      return { subtotal: 0, total: 0 };
    }

    const subtotal = cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const shipping = 0; // Free shipping for now
    return {
      subtotal,
      total: subtotal + shipping,
    };
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = (selectAll) => {
    if (selectAll) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }

    // TODO: Navigate to checkout or process order
    console.log('Checkout with items:', selectedItems);
    alert('Thanh toán: ' + selectedItems.length + ' sản phẩm');
  };

  const totals = calculateTotals();

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Giỏ hàng</h1>
        <p className='text-gray-600'>
          {cartItems.length} sản phẩm
          {selectedItems.length > 0 && ` • ${selectedItems.length} được chọn`}
        </p>
      </div>

      {/* Cart Table */}
      <CartTable
        items={cartItems}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        onDeleteItem={handleDeleteItem}
        onQuantityChange={handleQuantityChange}
      />

      {/* Pricing and Checkout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          {/* Additional info or promotions can go here */}
        </div>

        <div className='lg:col-span-1'>
          <PricingSection
            subtotal={totals.subtotal}
            shipping={0}
            total={totals.total}
            showShipping={true}
          />

          <Button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className='w-full px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Thanh toán ngay ({selectedItems.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
