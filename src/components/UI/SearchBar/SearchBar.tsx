'use client';

import { FC, useCallback, useState } from 'react';
import Image from 'next/image';

const SearchBar: FC = () => {
  const [search, setSearch] = useState<string>('');

  const handleFilterButton = useCallback(() => {
    // Open Filter Dropdown
  }, []);

  const handleSubmitSearch = useCallback(() => {
    // Dispatch search query Dropdown
  }, []);

  return (
    <div className="w-full relative">
      <input
        className="rounded-[5px] h-8 w-full px-2 text-sm"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="absolute right-0 top-0 flex flex-row h-full gap-1.5">
        <button className="focus-visible:outline-0 focus-visible:scale-125" onClick={handleSubmitSearch}>
          <Image src={'/images/icons/search.svg'} alt="search icon" width={20} height={20} />
        </button>
        <button
          className="rounded-[5px] border-[1px] border-gray-150 h-full px-2 flex items-center bg-gray-50 gap-1"
          onClick={handleFilterButton}
        >
          <span className="text-gray-500 text-sm">Filter</span>
          <Image
            className="focus-visible:outline-2"
            src="/images/icons/filter.svg"
            alt="filter"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
