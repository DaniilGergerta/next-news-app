// noinspection JSUnusedGlobalSymbols

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { FC, PropsWithChildren } from 'react';
import MainContainer from '../components/MainContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Top News',
  description: 'See the hottest news articles.',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
};
export default RootLayout;
