import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex flex-row items-center bg-gray-800 h-14 w-full justify-between px-4">
      <Link href={'/'}>
        <Image
          src={'/vercel.svg'}
          width={100}
          height={50}
          alt="Vercel Logo"
          className="hover:opacity-80 transition-opacity"
        />
      </Link>
    </header>
  );
};

export default Header;
