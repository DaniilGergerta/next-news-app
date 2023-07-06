'use client';

import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/common/constants';
import FlagImage from '@/components/UI/FlagImage';
import Arrow from '@/components/Icons/Arrow';
import { FC, FormEvent, useCallback, useRef, useState } from 'react';
import { TCountryCode } from '@/common/types';
import { getLocal } from '@/libs/localStorage/getLocal';

const CountryFlag: FC = () => {
  const input = useRef<HTMLInputElement>(null);
  const [collapse, setCollapse] = useState<boolean>(true);
  const [country, setCountry] = useState<TCountryCode>(getLocal('COUNTRY_CODES', DEFAULT_COUNTRY_CODE));
  const [search, setSearch] = useState<string>('');

  const openDropdown = useCallback(() => {
    setCollapse(false);
    setSearch('');
    input.current?.select();
  }, []);

  const closeDropdown = useCallback(() => {
    setCollapse(true);
    input.current?.blur();
  }, []);

  const handleCollapse = useCallback(() => {
    if (collapse) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }, [closeDropdown, collapse, openDropdown]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (COUNTRY_CODES.includes(search.toUpperCase())) {
        setCountry(search.toUpperCase());
      }

      closeDropdown();
    },
    [closeDropdown, search]
  );

  const handleSelect = useCallback(
    (country: string) => {
      setCountry(country);
      closeDropdown();
    },
    [closeDropdown]
  );

  return (
    <section className="relative">
      <div
        className="p-2 cursor-pointer hover:bg-gray-500/50 transition-colors rounded-sm relative"
        onClick={handleCollapse}
      >
        <form className="flex flex-row gap-1.5 items-center" onSubmit={handleSubmit}>
          <FlagImage countryCode={country} size={16} />
          <input
            ref={input}
            type="text"
            className="bg-transparent text-white text-sm w-6 placeholder-white focus-visible:placeholder:text-transparent uppercase focus-visible:outline-0 cursor-pointer"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={country}
            value={search}
            maxLength={2}
          />
          <Arrow direction={collapse ? 'left' : 'down'} size={6} thickness={2.5} />
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
