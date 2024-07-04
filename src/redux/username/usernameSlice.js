import { createSlice } from "@reduxjs/toolkit";

const usernameSlice = createSlice({
  name: "username",
  initialState: "",
  reducers: {
    setUsername: (state, action) => action.payload,
    clearUsername: () => "",
  },
});

export const { setUsername, clearUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
