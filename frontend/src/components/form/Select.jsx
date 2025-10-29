import React, { useState, useRef, useEffect } from 'react';

const Select = ({ options, value, onChange, name, id, required, direction = 'down' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedLabel = options.find(opt => opt.value === value)?.label || 
                       (options[0]?.value === '' ? options[0]?.label : 'Pilih Opsi');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={selectRef}>
      <select 
        name={name} 
        id={id} 
        value={value} 
        required={required} 
        onChange={onChange}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1 
        }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      
      <button
        type="button"
        className="w-full h-11 px-4 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
      </button>

      {isOpen && (
        <div 
          className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg
            ${direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'}
          `}
        >
          <ul className="py-1 max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              (!option.disabled || index === 0) && (
                <li
                  key={option.value}
                  className={`px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer ${
                    option.value === value ? 'bg-gray-100 font-medium' : ''
                  }`}
                  onClick={() => {
                    onChange({ target: { name, value: option.value } });
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;