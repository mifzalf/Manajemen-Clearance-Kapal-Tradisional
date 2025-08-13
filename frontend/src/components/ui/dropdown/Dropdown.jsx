import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const Dropdown = ({ isOpen, onClose, className, children, triggerRef }) => { // 1. Terima triggerRef
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 2. Tambahkan pengecekan agar tidak menutup jika tombol trigger yang diklik
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        triggerRef.current && !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={dropdownRef} className={className}>
      {children}
    </div>
  );
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  triggerRef: PropTypes.object, // 3. Tambahkan prop validation
};