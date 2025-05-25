// src/components/CategoryDropdown.jsx
import { Listbox } from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';

const categories = ["FnB", "Kosmetik", "Obat", "Tekstil", "Lainnya"];

export default function CategoryDropdown({ selectedCategory, onChange }) {
  return (
    <div className="relative w-32 justify-between">
      <Listbox value={selectedCategory} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="bg-[#670075] text-white text-xs rounded-xl px-3 py-2 w-full flex justify-between items-center">
            {selectedCategory}
            <IoIosArrowDown className="ml-1" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 z-20 text-sm">
            {categories.map((category) => (
              <Listbox.Option
                key={category}
                value={category}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? 'bg-[#670075] text-white' : 'text-gray-900'
                  }`
                }
              >
                {category}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
