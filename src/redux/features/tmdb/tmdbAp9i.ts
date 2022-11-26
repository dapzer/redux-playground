import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResponse } from '../../../types/SearchResponse';

export const tmdbApi = createApi({
  reducerPath: 'thmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: (build) => ({
    getMedia: build.query({
      query: ({ mediaId, mediaType }) => ({
        url: `/${mediaType}/${mediaId}`,
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      }),
    }),
    getSearchResult: build.query<SearchResponse.RootObject, {search: string, page: number}>({
      query: ({ search, page }) => ({
        url: `/search/multi`,
        params: {
          query: search,
          page,
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      }),
    }),
  }),
});
