'use client';

import { FC, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useStoreActions, useStoreState } from '@/store';
import { filtersConfig } from '@/common/config';

const SearchBar: FC = () => {
  const { setQuery, setFilterBy, getNews } = useStoreActions((actions) => actions);
  const { country, query } = useStoreState((state) => state);
  const [search, setSearch] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const handleFilterButton = useCallback(() => {
    setIsFiltersOpen(prev => !prev);
  }, []);

  const handleSubmitSearch = useCallback(() => {
    // Dispatch search query Dropdown
  }, []);

  const handleFilterOnClick = useCallback((title: string) => {
    if (title === 'All') {
      query ? getNews({ query: query.toLocaleLowerCase() }) : getNews({ country: country.toLocaleLowerCase() });
    }
    setFilterBy(title);
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setQuery(search);
    }
  }, [search])

  useEffect(() => {
    setSearch('')
  }, [country])

  return (
    <div className="w-full relative">
      <input
        className="rounded-[5px] h-8 w-full px-2 text-sm"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
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
        {isFiltersOpen && (
          <div className="absolute top-full left-0 bg-gray-200 rounded-[5px] w-full overflow-hidden">
            <ul className="py-2">
              {filtersConfig.map(filter => (
                <li key={filter.id}>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterOnClick(filter.title)}
                  >
                    {filter.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchBar;
