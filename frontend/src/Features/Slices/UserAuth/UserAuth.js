import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    auth: false,
    name: "",
    email: "",
    password: "",
  },
};

export const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = { ...action.payload, auth: true };
    },
    logOut: (state) => {
      state.user = { auth: false, name: "", email: "", password: "" };
    },
  },
});

export const { logIn, logOut } = userAuth.actions;
export default userAuth.reducer;
