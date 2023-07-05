import { FC } from 'react';
import { LinkOverlayProps } from '@/components/UI/LinkOverlay/config/props';

const LinkOverlay: FC<LinkOverlayProps> = ({ url, label }) => {
  return (
    <a
      href={url}
      className="absolute top-0 left-0 w-full h-full bg-gray-800/70 backdrop-blur-0 flex items-center justify-around hover:backdrop-blur-sm opacity-100 hover:opacity-100 transition-all"
    >
      <section className="text-xl font-bold">{label}</section>
    </a>
  );
};
export default LinkOverlay;
