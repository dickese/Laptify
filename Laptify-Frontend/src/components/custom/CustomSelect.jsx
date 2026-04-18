import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CustomSelect({
  label,
  placeholder = 'Select an option',
  options = [],
  value,
  onChange,
  error,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => {
    // Support both id-based (new structure) and value-based (old structure)
    return opt.id === value || opt.value === value;
  });

  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className='text-sm font-medium text-gray-700'>{label}</label>
      )}
      <div className='relative'>
        <button
          type='button'
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-between text-left bg-white'
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption
              ? selectedOption.label || selectedOption.value
              : placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className='absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-50'>
            {options.length === 0 ? (
              <div className='px-3 py-2 text-gray-400 text-sm'>No options</div>
            ) : (
              <div className='max-h-60 overflow-y-auto'>
                {options.map((option) => {
                  const optionValue =
                    option.id !== undefined ? option.id : option.value;
                  const optionLabel = option.label || option.value;
                  return (
                    <button
                      key={optionValue}
                      onClick={() => {
                        onChange(optionValue);
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 transition ${
                        value === optionValue
                          ? 'bg-red-50 text-red-600 font-medium'
                          : 'text-gray-900'
                      }`}
                    >
                      {optionLabel}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  );
}
