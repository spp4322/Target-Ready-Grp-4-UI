import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./username/usernameSlice";

const store = configureStore({
  reducer: {
    username: usernameReducer,
  },
});

export default store;
