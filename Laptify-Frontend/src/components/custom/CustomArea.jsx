export default function CustomArea({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}) {
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className='text-sm font-medium text-gray-700'>{label}</label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
      />
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  );
}
