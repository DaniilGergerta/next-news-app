import { PropsWithChildren } from 'react';

export interface Props {
  imageUrl?: string;
}

export const ArticleContainer = ({ children, imageUrl }: PropsWithChildren<Props>) => (
  <div
    className="bg-gray-50 bg-cover sm:rounded-xl overflow-hidden text-white relative bg-center"
    style={{
      backgroundImage: !imageUrl
        ? `linear-gradient(to right top, #D16BA5, #C777B9, #BA83CA, #AA8FD8, #9A9AE1, #8AA7EC, #79B3F4, #69BFF8, #52CFFE, #41DFFF, #46EEFA, #5FFBF1)`
        : '',
    }}
  >
    {imageUrl && <img className="object-contain absolute" src={imageUrl} alt="" loading="lazy" />}
    {children}
  </div>
);
export default ArticleContainer;
