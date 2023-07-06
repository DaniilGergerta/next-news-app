'use client';

import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/common/constants';
import FlagImage from '../FlagImage';
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { TCountryCode } from '@/common/types';
import { getLocal } from '@/libs/localStorage/getLocal';
import Arrow from '@/components/Icons/Arrow';
import { useClickOutside, useScrollLock } from '@mantine/hooks';
import { useStoreActions, useStoreState } from '@/store';

const CountryFlag: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [_, setScrollLocked] = useScrollLock(false);
  const { country } = useStoreState((state) => state);
  const { setCountry, setQuery } = useStoreActions((actions) => actions)

  useEffect(() => {
    setCountry(getLocal('COUNTRY_CODES', DEFAULT_COUNTRY_CODE));
  }, []);

  const openDropdown = useCallback(() => {
    setCollapse(false);
    setSearch('');
    inputRef.current?.select();
    setScrollLocked(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setCollapse(true);
    inputRef.current?.blur();
    setScrollLocked(false);
  }, []);

  const handleCollapse = useCallback(() => {
    if (collapse) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }, [collapse]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (COUNTRY_CODES.includes(search.toUpperCase())) {
        setCountry(search.toUpperCase());
      }

      closeDropdown();
    },
    [search]
  );

  const handleSelect = useCallback((country: string) => {
    setQuery('');
    setCountry(country);
    closeDropdown();
  }, []);

  const containerRef = useClickOutside(closeDropdown);

  return (
    <section ref={containerRef} className="relative" onClick={handleCollapse}>
      <div className="p-2 cursor-pointer hover:bg-gray-500/50 transition-colors rounded-sm relative">
        <form className="flex flex-row gap-1.5 items-center" onSubmit={handleSubmit}>
          <FlagImage countryCode={country} size={16} />
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent text-white text-sm w-6 placeholder-white focus-visible:placeholder:text-transparent uppercase focus-visible:outline-0 cursor-pointer"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={country}
            value={search}
            maxLength={2}
          />
          <Arrow direction={collapse ? 'down' : 'up'} size={6} thickness={2.5} />
        </form>
      </div>
      <div
        className="thin-scrollbar absolute top-full rounded-md bg-white border-gray-500 border-solid overflow-auto transition-all w-full"
        style={{
          height: 'fit-content',
          maxHeight: collapse ? '0px' : '300px',
        }}
      >
        {COUNTRY_CODES.filter((country) => country.startsWith(search.toUpperCase())).map((country, i) => (
          <div
            className="my-0.5 ml-2 flex flex-row gap-2 cursor-pointer items-center"
            key={i}
            onClick={() => handleSelect(country)}
          >
            <FlagImage countryCode={country} size={16} />
            <span>{country}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default CountryFlag;
