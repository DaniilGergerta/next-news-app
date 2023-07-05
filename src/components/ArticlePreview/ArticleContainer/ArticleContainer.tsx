import { FC, PropsWithChildren } from 'react';

export interface Props {
  imageUrl?: string;
}

export const ArticleContainer: FC<PropsWithChildren<Props>> = ({ children, imageUrl }) => (
  <div
    className="bg-gray-50 bg-cover sm:rounded-xl overflow-hidden text-white relative bg-center"
    style={{
      backgroundImage: imageUrl
        ? `url("${imageUrl}")`
        : `linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)`,
    }}
  >
    {children}
  </div>
);
export default ArticleContainer;
