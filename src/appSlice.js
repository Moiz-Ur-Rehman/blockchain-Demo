import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    referesh: false,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.referesh = action.payload.referesh;
    },
  },
});
export const { enterRoom } = appSlice.actions;
export const selectReferesh = (state) => state.app.referesh;
export default appSlice.reducer;
