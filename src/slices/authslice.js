import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  isLoggedIn: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setIsLoggedIn, setToken } = authSlice.actions;
export default authSlice.reducer;