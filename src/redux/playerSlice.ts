import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Player from '../types/Player';
import fetchPlayerByName from './playerThunks/fetchPlayerByName';
import fetchPlayers from './playerThunks/fetchPlayers';
import createPlayer from './playerThunks/createPlayer';
interface PlayerState {
  player: Player | null;
  players: Player[];

  fetchPlayerByNameStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  fetchPlayerByNameError: null | string;
}

const initialState: PlayerState = {
  player: null,
  players: [],
  fetchPlayerByNameStatus: 'idle',
  fetchPlayerByNameError: null,
};
const playerSlice = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {
    setPlayer(state, action: PayloadAction<null | Player>) {
      state.player = action.payload;
    },
    setPlayerError(state, action: PayloadAction<null | string>) {
      state.fetchPlayerByNameError = action.payload;
      if (action.payload === null) {
        state.fetchPlayerByNameStatus = 'idle';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayerByName.pending, (state) => {
      state.fetchPlayerByNameStatus = 'pending';
    });
    builder.addCase(fetchPlayerByName.fulfilled, (state, action: PayloadAction<Player>) => {
      state.fetchPlayerByNameStatus = 'fulfilled';
      state.player = action.payload;
    });
    builder.addCase(fetchPlayerByName.rejected, (state, action) => {
      state.fetchPlayerByNameStatus = 'rejected';
      state.fetchPlayerByNameError = action.payload as string;
    });

    builder.addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    });

    builder.addCase(createPlayer.fulfilled, (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    });
  },
});

export const { setPlayer, setPlayerError } = playerSlice.actions;

export default playerSlice.reducer;
