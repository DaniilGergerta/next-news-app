import Image from 'next/image';
import Link from 'next/link';
import CountryFlag from '@/components/CountryFlag';
import SearchBar from '@/components/UI/SearchBar';

const Header = () => (
  <header className="grid grid-cols-3 items-center bg-gray-800 h-16 w-full justify-between px-4 sticky top-0 z-50">
    <Link className="hover:opacity-80 transition-opacity" href={'/'}>
      <Image src={'/images/logo.svg'} width={100} height={22} alt="Vercel Logo" />
    </Link>
    <SearchBar />
    <div className="flex flex-row justify-end">
      <CountryFlag />
    </div>
  </header>
);

export default Header;
