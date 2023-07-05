import { FC, PropsWithChildren } from 'react';

const MainContainer: FC<PropsWithChildren> = ({ children }) => (
  <main className="container mx-auto mt-8 lg:max-w-4xl">{children}</main>
);
export default MainContainer;
