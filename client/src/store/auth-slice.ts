import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    getUser: (state, { payload }) => {
      //   console.log(payload);
      state.user = payload;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { getUser, signOut } = authSlice.actions;

export default authSlice.reducer;
