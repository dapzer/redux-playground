import React, { FC, useEffect, useState } from 'react';
import { tmdbApi } from '../redux/features/tmdb/tmdbAp9i';
import { addNewMediaInFavorites } from '../redux/features/favorite/favoriteSlice';
import { useAppDispatch } from '../redux/hooks';

interface Props {

}

const Search: FC<Props> = () => {
  const [search, setSearch] = useState(``);
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, currentData } = tmdbApi.useGetSearchResultQuery({ search, page }, { skip: search.length < 1 });
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log( data?.results.at(-1), search);
  }, [data])

  return (
    <div>
      <input type='text' onChange={(event) => setSearch(event.target.value)} />
      <div className="row">
        <button onClick={() => setPage(page - 1)}>Prev Page</button>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div>
      <h1 hidden={!isLoading}>isLoading {isLoading}</h1>
      <h1 hidden={!isFetching}>isFetching {isFetching}</h1>
      <div className='row'>
        {data?.results && data.results.map((el) => (
          <div className='card' key={el.id}>
            <h3>{el.name || el.title || el.original_name}</h3>
            <button
              onClick={() => dispatch(addNewMediaInFavorites({ mediaId: el.id, mediaType: el.media_type }))}>Добавить в
              избранное
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
