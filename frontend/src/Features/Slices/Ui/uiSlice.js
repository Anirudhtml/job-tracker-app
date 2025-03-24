import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isLoginFormOpen: false,
    isSignupFormOpen: false
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openLoginForm: (state) => {state.isLoginFormOpen = true},
        closeLoginForm: (state) => {state.isLoginFormOpen = false},
        openSignupForm: (state) => {state.isSignupFormOpen = true},
        closeSignupForm: (state) => {state.isSignupFormOpen = false}
    }
})

export const {openLoginForm, openSignupForm, closeLoginForm, closeSignupForm} = uiSlice.actions
export default uiSlice.reducer