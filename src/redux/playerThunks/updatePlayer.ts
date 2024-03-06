import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Player from '../../types/Player';
const baseUrl = import.meta.env.VITE_BASE_URL;

export default createAsyncThunk('usersReducer/updatePlayerById', async (player: Player, { rejectWithValue }) => {
  const response = axios
    .patch<Player[]>(`${baseUrl}/updatePlayerById`, { ...player, id: undefined, cs2_data: undefined } as Player, {
      params: {
        id: player.id,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? 'Unknown error');
      } else if (error instanceof Error) {
        return rejectWithValue(error.message ?? 'Unknown error');
      } else {
        return rejectWithValue('Unknown error');
      }
    });

  return response;
});
