import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: [0, 0, 0],
  loading: false,
};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export default dashboard.reducer;
export const { setActive } = dashboard.actions;
export const selectCurrentChannel = (state) => state.dashboard.dashboard;
export const selectLoading = (state) => state.dashboard.loading;
export const selectActive = (state) => state.dashboard.active;
