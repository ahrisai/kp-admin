import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Player from '../types/Player';
import fetchPlayerByName from './playerThunks/fetchPlayerByName';
import fetchPlayers from './playerThunks/fetchPlayers';
import createPlayer from './playerThunks/createPlayer';
import deletePlayer from './playerThunks/deletePlayer';
import updatePlayer from './playerThunks/updatePlayer';
import { PlayersWithPages } from '../types/PlayersWithPages';
interface PlayerState {
  player: Player | null;
  players: Player[];
  sort: 'asc' | 'desc';
  filter: string;
  cs2_data: boolean;
  desc: boolean;
  user_avatar: boolean;
  fetchPlayerByNameStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  fetchPlayerByNameError: null | string;
  gender: 'male' | 'female' | '';
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  searchFilter: string;
}

const initialState: PlayerState = {
  player: null,
  players: [],
  fetchPlayerByNameStatus: 'idle',
  fetchPlayerByNameError: null,
  sort: 'asc',
  filter: 'id',
  cs2_data: false,
  desc: false,
  user_avatar: false,
  gender: '',
  currentPage: 1,
  totalPages: 5,
  searchQuery: '',
  searchFilter: 'nickname',
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
    setSort(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sort = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setCs2_data(state, action: PayloadAction<boolean>) {
      state.cs2_data = action.payload;
    },
    setDesc(state, action: PayloadAction<boolean>) {
      state.desc = action.payload;
    },
    setUser_Avatar(state, action: PayloadAction<boolean>) {
      state.user_avatar = action.payload;
    },
    setGender(state, action: PayloadAction<'male' | 'female' | ''>) {
      state.gender = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSearchFilter(state, action: PayloadAction<string>) {
      state.searchFilter = action.payload;
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

    builder.addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<PlayersWithPages>) => {
      state.players = action.payload.players;
      state.totalPages = action.payload.totalPages;
      if (action.payload.totalPages === 1) {
        state.currentPage = 1;
      }
    });

    builder.addCase(createPlayer.fulfilled, (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    });

    builder.addCase(deletePlayer.fulfilled, (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    });

    builder.addCase(updatePlayer.fulfilled, (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    });
  },
});

export const {
  setPlayer,
  setPlayerError,
  setSort,
  setCs2_data,
  setDesc,
  setFilter,
  setUser_Avatar,
  setGender,
  setCurrentPage,
  setSearchFilter,
  setSearchQuery,
} = playerSlice.actions;

export default playerSlice.reducer;
