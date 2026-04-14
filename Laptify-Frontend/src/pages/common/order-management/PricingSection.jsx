export default function PricingSection({
  subtotal = 0,
  shipping = 0,
  total = 0,
  showShipping = true,
}) {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
      <div className='space-y-3 max-w-sm ml-auto'>
        <div className='flex justify-between items-center py-2 border-b border-gray-200'>
          <span className='text-gray-700'>Tổng tiền hàng:</span>
          <span className='font-semibold'>
            {subtotal.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
        </div>

        {showShipping && (
          <div className='flex justify-between items-center py-2 border-b border-gray-200'>
            <span className='text-gray-700'>Phí vận chuyển:</span>
            <span className='font-semibold'>
              {shipping === 0
                ? 'Miễn phí'
                : shipping.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
            </span>
          </div>
        )}

        <div className='flex justify-between items-center py-3 text-lg'>
          <span className='font-semibold text-gray-900'>Tổng cộng:</span>
          <span className='font-bold text-gray-900'>
            {total.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
