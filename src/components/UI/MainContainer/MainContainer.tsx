import { FC, PropsWithChildren } from 'react';

const MainContainer: FC<PropsWithChildren> = ({ children }) => (
  <main className="container mx-auto mt-8">{children}</main>
);
export default MainContainer;
