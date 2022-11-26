import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import Header from './Header';
import { useAppDispatch } from '../../redux/hooks';
import { fetchFavoritesById } from '../../redux/features/favorite/favoriteThunks';

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesById(`636f8dab679a1b19d0134b3f`));
  }, []);

  return (
    <div className={'layout container'}>
      <header style={{paddingTop: "30px", display: "flex", gap: "30px"}}>
        <Header />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
