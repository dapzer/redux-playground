import React, { FC } from 'react';
import { tmdbApi } from '../redux/features/tmdb/tmdbAp9i';
import { useAppDispatch } from '../redux/hooks';
import { updateType } from '../redux/features/favorite/favoriteSlice';

interface Props {
  mediaId?: number;
  mediaType?: string;
}

const Movie: FC<Props> = ({ mediaId, mediaType }) => {
  const { data } = tmdbApi.useGetMediaQuery({ mediaType, mediaId });
  const dispatch = useAppDispatch();

  return (
    <div className='card'>
      {data && (
        <>
          <h1>{data.title || data.original_title || data.name}</h1>
          <p>{mediaType}</p>
          <button
            onClick={() => dispatch(updateType({ newType: 'customMediaType', mediaId: mediaId!, mediaStatus: 'notViewed' }))}>
            Change media type
          </button>
        </>
      )}
    </div>
  );
};

export default Movie;
