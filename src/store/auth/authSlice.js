import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', //not-authenticated, authenticated
    user: {},
    errorMessage: null
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking"
    },
    onLogin: (state,{ payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    }

  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;