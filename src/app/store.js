import { configureStore } from "@reduxjs/toolkit";
import registerUserReduer from "../featuers/auth/registerSlice"
export const store = configureStore({
  reducer: {
    registerUser: registerUserReduer,
  },
});
