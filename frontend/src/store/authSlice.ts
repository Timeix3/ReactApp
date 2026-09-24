import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './authApi';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('access_token'),
  isAuthenticated: Boolean(localStorage.getItem('access_token')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
    },
  },
  extraReducers: (build) => {
    build.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        localStorage.setItem('access_token', action.payload.access_token);
      }
    );
    build.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;