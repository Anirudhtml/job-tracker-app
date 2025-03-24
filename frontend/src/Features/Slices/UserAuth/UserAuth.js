import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, Register, Logout } from "../../apiCalls/userApi";

export const registerUser = createAsyncThunk("registerUser", async(credentials, {rejectWithValue}) => {
  try {
    return await Register(credentials)
  } catch (error) {
    console.log("error occured while registering the user", error)
    return rejectWithValue(error.response?.data || "error occured while registering the user")
  }
})

export const loginUser = createAsyncThunk("loginUser", async(credentials, {rejectWithValue}) => {
  try {
    return await Login(credentials)
  } catch (error) {
    console.log("error occured while loging the user in", error)
    return rejectWithValue(error.response?.data || "error occured while registering the user")
  }
})

export const logoutUser = createAsyncThunk("logoutUser", async({rejectWithValue}) => {
  try {
    return await Logout()
  } catch (error) {
    console.log("error occured while loging the user out", error)
    return rejectWithValue(error.response?.data || "error occured while registering the user")
  }
})

const initialState = {
  user: {
    auth: false,
    userName: "",
    email: "",
    password: "",
  },
  avatar: null,
  isLoading: false,
  Error: null,
};

export const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.Error = null
      })

      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.user = { ...action.payload, auth: true };
        state.avatar = action.payload.avatar
        state.isLoading = false
        state.Error = null

        localStorage.setItem('accessToken', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken)
      })

      builder.addCase(logoutUser.fulfilled, (state, action) => {
        state.user = { ...action.payload, auth: true };
        state.avatar = action.payload.avatar
        state.isLoading = false
        state.Error = null
      })
      builder.addCase(registerUser.pending, (state, action) => {
        state.isLoading = true
      })
      builder.addCase(registerUser.rejected, (state, action) => {
        state.Error = true;
        console.log(action.payload)
      })
  }
});

export const { logIn, logOut } = userAuth.actions;
export default userAuth.reducer;
