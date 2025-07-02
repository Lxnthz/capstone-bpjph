// src/components/YearDropdown.jsx
import { Listbox } from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';

const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

export default function YearDropdown({ selectedYear, onChange }) {
  return (
    <div className="relative w-20 justify-between">
      <Listbox value={selectedYear} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="bg-[#670075] text-white text-xs rounded-xl px-3 py-2 w-fit flex justify-between items-center">
            {selectedYear}
            <IoIosArrowDown className="ml-1" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 z-20 text-sm">
            {years.map((year) => (
              <Listbox.Option
                key={year}
                value={year}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? 'bg-[#670075] text-white' : 'text-gray-900'
                  }`
                }
              >
                {year}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}