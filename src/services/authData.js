import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    token: '',
    username: '',
    email: '',
    image: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          user: action.payload,
        })
      );
      localStorage.setItem('token', action.payload.token);
      //   eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
    logout: () => {
      localStorage.clear();
      return initialState;
    },
  },
});

export default authSlice;
export const { login, logout } = authSlice.actions;
