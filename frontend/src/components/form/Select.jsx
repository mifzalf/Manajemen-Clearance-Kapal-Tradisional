import React, { useState, useRef, useEffect } from 'react';

const Select = ({ options, value, onChange, name, id, required, direction = 'down' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedLabel = options.find(opt => opt.value === value)?.label || options[0]?.label;

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
      <select name={name} id={id} value={value} onChange={onChange} required={required} className="hidden">
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
          <ul className="py-1">
            {options.map(option => (
              !option.disabled && (
                <li
                  key={option.value}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
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