import { FavoriteList } from '../../../types/FavoriteList';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoritesById } from './favoriteThunks';

const initialState: FavoriteList.StatusedObject = {
  notViewed: [],
  viewed: [],
  watchingNow: [],
  waitNewPart: [],
  allFavorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favoriteSlice',
  initialState,
  reducers: {
    addNewMediaInFavorites: (state, { payload }: PayloadAction<{ mediaId: number, mediaType: string }>) => {
      const mediaItem: FavoriteList.RootObject = {
        id: payload.mediaId,
        addedDate: Date.now(),
        mediaType: payload.mediaType,
        currentStatus: 'notViewed',
        seriesData: {
          currentEpisode: 1,
          currentSeason: 0,
          sitesToView: [],
        },
      };

      state['notViewed'] = [...state['notViewed'] || [], mediaItem];

      if (!state.allFavorites) {
        state.allFavorites = [mediaItem];
      } else {
        state.allFavorites.push(mediaItem);
      }
    },
    updateType: (state, { payload }: PayloadAction<{ mediaId: number, mediaStatus: string, newType: string }>) => {
      const statusIndex = state[payload.mediaStatus as keyof FavoriteList.StatusedObject]?.findIndex((el) => el.id === payload.mediaId);
      const allIndex = state.allFavorites?.findIndex((el) => el.id === payload.mediaId);

      state[payload.mediaStatus as keyof FavoriteList.StatusedObject]![statusIndex!].mediaType = payload.newType;
      state.allFavorites![allIndex!].mediaType = payload.newType;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoritesById.fulfilled, (state: FavoriteList.StatusedObject, { payload }) => {
      return state = payload || initialState;
    });
  },
});

export const { addNewMediaInFavorites, updateType } = favoriteSlice.actions;

export default favoriteSlice.reducer;
