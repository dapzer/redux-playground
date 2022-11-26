import Head from 'next/head';
import { useAppSelector } from '../redux/hooks';
import React  from 'react';
import Movie from '../components/Movie';
import Search from '../components/Search';

export default function Home() {
  const favoriteList = useAppSelector((state) => state.favoriteList.notViewed);

  return (
    <div>
      <Head>
        <title>Redux Test</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Search />

      <div className='row'>
        {favoriteList && favoriteList.map((value, index, array) => (
          <Movie key={index} mediaId={value.id} mediaType={value.mediaType} />
        ))}
      </div>
    </div>
  );
}