import { configureStore } from '@reduxjs/toolkit';
import { favoriteSlice } from './features/favorite/favoriteSlice';
import { tmdbApi } from './features/tmdb/tmdbAp9i';

export const store = configureStore({
  reducer: {
    favoriteList: favoriteSlice.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
