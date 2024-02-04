import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import ClientUser from '../types/ClientUser';
import Cs2Data from '../types/Cs2Data';
import checkUserIsAuth from './userThunks/checkUserIsAuth';
import fetchUser from './userThunks/fetchUser';
import createUser from './userThunks/createUser';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const refillCs2Data = createAsyncThunk('usersReducer/refillCs2Data', async (data: Record<string, number[]>, { rejectWithValue }) => {
  const response = axios
    .patch(`${baseUrl}/refillCs2`, data, { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message ?? 'Unknown error');
      } else if (error instanceof Error) {
        return rejectWithValue(error.message ?? 'Unknown error');
      } else {
        return rejectWithValue('Unknown error');
      }
    });
  return response;
});

interface UserState {
  user: ClientUser | null;
  isAuth: boolean;
  isGameCreationActive: 'cs2' | 'valorant' | null;
  createUserStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  fetchUserStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  checkUserStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  refillCs2DataStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  createUserError: string | null;
  fetchUserError: string | null;
  refillCs2DataError: string | null;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isGameCreationActive: null,
  createUserStatus: 'idle',
  createUserError: null,

  fetchUserStatus: 'idle',
  fetchUserError: null,

  checkUserStatus: 'idle',

  refillCs2DataStatus: 'idle',
  refillCs2DataError: null,
};

const usersSlice = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {
    resetUserStatus(state) {
      state.createUserStatus = 'idle';
      state.createUserError = null;
    },

    changeIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;

      state.fetchUserStatus = 'idle';
      if (!action.payload) {
        state.user = null;
      }
    },

    setPendingForCheck(state) {
      state.checkUserStatus = 'pending';
    },
    setGameCreationActive(state, action: PayloadAction<'cs2' | 'valorant' | null>) {
      state.isGameCreationActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.fetchUserStatus = 'pending';
    });
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<ClientUser>) => {
      state.fetchUserStatus = 'fulfilled';
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
        text: `Welcome, ${action.payload.nickname}`,
      });
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.fetchUserStatus = 'rejected';
      state.fetchUserError = action.payload as string;
      Swal.fire({
        icon: 'error',
        title: 'Login Failure',
        text: state.fetchUserError,
        showConfirmButton: true,
        confirmButtonText: 'Get It',
      });
    });

    builder.addCase(createUser.pending, (state) => {
      state.createUserStatus = 'pending';
    });
    builder.addCase(createUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.createUserStatus = 'fulfilled';
      Swal.fire({
        icon: 'success',
        title: `Registration Successful`,
        text: `User ${action.payload} was created`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.createUserStatus = 'rejected';
      state.createUserError = action.payload as string;

      Swal.fire({
        icon: 'error',
        title: 'Registration Failure',
        text: state.createUserError,
        showConfirmButton: true,
        timer: 3000,
        confirmButtonText: 'Get It',
      });
    });

    builder.addCase(checkUserIsAuth.pending, (state) => {
      state.checkUserStatus = 'pending';
    });
    builder.addCase(checkUserIsAuth.fulfilled, (state, action: PayloadAction<ClientUser | undefined>) => {
      if (action.payload) {
        state.checkUserStatus = 'fulfilled';
        state.user = action.payload;
        state.isAuth = true;
      }
    });
    builder.addCase(checkUserIsAuth.rejected, (state) => {
      state.checkUserStatus = 'rejected';
    });

    //cs2
    builder.addCase(refillCs2Data.pending, (state) => {
      state.refillCs2DataStatus = 'pending';
    });
    builder.addCase(refillCs2Data.fulfilled, (state, action: PayloadAction<Cs2Data>) => {
      state.refillCs2DataStatus = 'fulfilled';
      console.log(action.payload);
      if (state.user?.cs2_data) {
        state.user.cs2_data = action.payload;
        state.fetchUserStatus = 'fulfilled';
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Ура!',
          text: `Ваш игровой профиль по CS2 успешно создан! Желаете посмотреть его?`,
        });
      }
    });

    builder.addCase(refillCs2Data.rejected, (state, action) => {
      state.refillCs2DataStatus = 'rejected';
      state.refillCs2DataError = action.payload as string;
    });
  },
});

export const { resetUserStatus, changeIsAuth, setPendingForCheck, setGameCreationActive } = usersSlice.actions;

export default usersSlice.reducer;
