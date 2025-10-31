import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

// [DIUBAH] Hapus prop 'direction', karena sekarang otomatis
const Select = ({ options, value, onChange, name, id, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null); // Ref untuk tombol
  const menuRef = useRef(null);   // Ref untuk <div> wrapper menu
  const ulRef = useRef(null);     // Ref untuk <ul> yang di-scroll

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
  // [BARU] State untuk menyimpan arah dropdown (up/down)
  const [direction, setDirection] = useState('down'); 

  const selectedLabel = options.find(opt => opt.value === value)?.label || 
                       (options[0]?.value === '' ? options[0]?.label : 'Pilih Opsi');

  const updateMenuPosition = useCallback(() => {
    if (!selectRef.current) {
      setIsOpen(false);
      return;
    }
    const rect = selectRef.current.getBoundingClientRect();

    // [BARU] Logika deteksi arah
    // Cek jarak dari tombol ke bawah layar
    const spaceBelow = window.innerHeight - rect.bottom;
    // Tentukan tinggi menu (maks 240px (max-h-60) + padding)
    const menuHeight = Math.min(250, options.length * 40); 
    
    // Jika tidak cukup ruang di bawah, buka ke atas
    if (spaceBelow < menuHeight && rect.top > menuHeight) {
      setDirection('up');
    } else {
      setDirection('down');
    }
    
    setMenuPosition({
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
    });
  }, [options.length]); // Tambahkan dependensi

  const toggleDropdown = () => {
    if (!isOpen) {
      updateMenuPosition(); // Atur posisi & arah awal saat membuka
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current && !selectRef.current.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;

    let scrollableParent = selectRef.current?.parentElement;
    let found = false;
    while (scrollableParent && !found) {
      if (scrollableParent.tagName === 'BODY') break;
      const style = window.getComputedStyle(scrollableParent);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        found = true;
        break;
      }
      scrollableParent = scrollableParent.parentElement;
    }

    window.addEventListener('scroll', updateMenuPosition, true);
    window.addEventListener('resize', updateMenuPosition);
    
    if (found && scrollableParent) {
      scrollableParent.addEventListener('scroll', updateMenuPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateMenuPosition, true);
      window.removeEventListener('resize', updateMenuPosition);
      if (found && scrollableParent) {
        scrollableParent.removeEventListener('scroll', updateMenuPosition);
      }
    };
  }, [isOpen, updateMenuPosition]);


  const DropdownMenu = (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        // [DIUBAH] Gunakan state 'direction' untuk mengatur posisi
        top: direction === 'down' ? `${menuPosition.bottom + 4}px` : 'auto', 
        bottom: direction === 'up' ? `${window.innerHeight - menuPosition.top + 4}px` : 'auto', 
        left: `${menuPosition.left}px`,
        width: `${menuPosition.width}px`,
        zIndex: 9999,
      }}
      className="bg-white border border-gray-300 rounded-lg shadow-lg"
      onWheel={(e) => {
          const ul = ulRef.current;
          if (!ul) return;
          const { scrollTop, scrollHeight, clientHeight } = ul;
          const isAtTop = scrollTop === 0;
          const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
          const isScrollable = scrollHeight > clientHeight;
          if (!isScrollable) {
              e.preventDefault();
              return;
          }
          if (isAtTop && e.deltaY < 0) {
              e.preventDefault();
          } else if (isAtBottom && e.deltaY > 0) {
              e.preventDefault();
          }
      }}
    >
      <ul 
        ref={ulRef}
        className="py-1 max-h-60 overflow-y-auto"
      >
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
  );

  return (
    <div className="relative w-full" ref={selectRef}>
      <select 
        name={name} 
        id={id} 
        value={value} 
        required={required} 
        onChange={onChange}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%',
          height: '100%', opacity: 0, pointerEvents: 'none', zIndex: -1 
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
        onClick={toggleDropdown}
      >
        {selectedLabel}
      </button>

      {isOpen && ReactDOM.createPortal(DropdownMenu, document.body)}
    </div>
  );
};

export default Select;