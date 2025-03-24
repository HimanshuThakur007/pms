import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authReducer from './authSlice'

const store = configureStore({
    // reducer: commonSlice,
    reducer: {
      CRMS: commonSlice,
      auth: authReducer, 
    },
  });

  export type RootState = ReturnType<typeof store.getState>;
  export default store;
  