import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckLineIcon } from '../../icons';

const FilterDropdown = ({ options, selectedValue, setSelectedValue, placeholder }) => {
  const selectedLabel = options.find(option => option === selectedValue) || placeholder || 'Pilih Opsi';

  return (
    <Listbox value={selectedValue} onChange={setSelectedValue}>
      <div className="relative w-full sm:w-56">
        <Listbox.Button className="relative h-11 w-full cursor-default rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-left text-sm text-gray-800 shadow-sm transition-colors duration-200 hover:border-brand-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/20">
          <span className="block truncate">{selectedLabel}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Listbox.Option
              className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100' : 'text-gray-900'}`}
              value=""
            >
              {({ selected }) => (
                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{placeholder || 'Pilih Semua'}</span>
              )}
            </Listbox.Option>
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100' : 'text-gray-900'}`}
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option}</span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-600">
                        <CheckLineIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default FilterDropdown;