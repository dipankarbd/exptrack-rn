import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthTokenState, AuthTokenUpdatePayload } from '../types';

const initialState: AuthTokenState = {
  token: null,
  expiresAt: 0,
};

const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: initialState,
  reducers: {
    updateAuthToken: (state, action: PayloadAction<AuthTokenUpdatePayload>) => {
      const now = new Date();
      const ms = now.getTime();
      const expiresSec = parseInt(action.payload.expires.replace('s', ''), 10);

      state.token = action.payload.token;
      state.expiresAt = ms + expiresSec * 1000;
    },
  },
});

export const { updateAuthToken } = authTokenSlice.actions;
export const authTokenReducer = authTokenSlice.reducer;
