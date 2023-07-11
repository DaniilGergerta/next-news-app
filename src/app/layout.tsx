'use client';

// noinspection JSUnusedGlobalSymbols

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { FC, PropsWithChildren } from 'react';
import MainContainer from '../components/MainContainer';
import { StoreProvider } from 'easy-peasy';
import { store } from '@/store';

const inter = Inter({ subsets: ['latin'] });

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider store={store}>
          <Header />
          <MainContainer>{children}</MainContainer>
        </StoreProvider>
      </body>
    </html>
  );
};
export default RootLayout;
