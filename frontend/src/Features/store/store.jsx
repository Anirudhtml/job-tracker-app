import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../Slices/JobData/JobDataSlice";
import userAuth from "../Slices/UserAuth/UserAuth";
import uiSlice from "../Slices/ui/uiSlice";


const store = configureStore({
  reducer: { job: jobReducer, userAuth: userAuth, uiSlice: uiSlice },
});

export default store;
