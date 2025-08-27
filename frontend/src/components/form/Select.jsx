import React, { useState, useEffect, useRef } from 'react';

const Select = ({ options, value, onChange, name, id, className, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find(option => option.value === value) || options.find(o => o.value === '') || options[0];

  const handleSelect = (selectedValue) => {
    const event = {
      target: { name, value: selectedValue },
    };
    onChange(event);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        required={required}
        onChange={() => {}}
        className="absolute w-px h-px p-0 m-[-1px] overflow-hidden border-0"
        style={{ clip: 'rect(0, 0, 0, 0)' }}
        tabIndex={-1}
      />
      <button
        type="button"
        className="h-11 w-full flex items-center justify-between rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? 'text-gray-800' : 'text-gray-500'}>{selectedOption.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul className="max-h-60 overflow-auto rounded-lg p-1">
            {options.map(option => (
              <li
                key={option.value}
                className={`cursor-pointer rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 ${option.disabled ? 'hidden' : ''}`}
                onClick={() => !option.disabled && handleSelect(option.value)}
                role="option"
                aria-selected={value === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;