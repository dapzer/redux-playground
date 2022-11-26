import { createAsyncThunk } from '@reduxjs/toolkit';
import { FavoriteList } from '../../../types/FavoriteList';

export const fetchFavoritesById = createAsyncThunk(
  'favorite/fetchById',
  async (userId: string) => {
    const response = await fetch(`http://localhost:3001/api/proxy?url=http://localhost:3000/api/favorite?userId=${userId}`);

    if (response.ok) {
      const data = await response.json();
      return data.favoriteList as FavoriteList.StatusedObject;
    } else {
      console.log('Ooops, error: ', response.status);
    }
  },
);
