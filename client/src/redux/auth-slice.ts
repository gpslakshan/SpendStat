import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {},
  },
  reducers: {
    setUser: (state, { payload }) => {
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

export const { setUser, signOut } = authSlice.actions;

export default authSlice.reducer;
