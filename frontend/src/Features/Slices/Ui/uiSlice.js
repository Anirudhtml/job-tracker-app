import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isLoginFormOpen: false
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openForm: (state) => {state.isLoginFormOpen = true},
        closeForm: (state) => {state.isLoginFormOpen = false}
    }
})

export const {openForm, closeForm} = uiSlice.actions
export default uiSlice.reducer