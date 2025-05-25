import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../api/axiosInstance";

export const getChannelStats = createAsyncThunk(
  "dashboard/getChannelStats",
  async () => {
    try {
      const response = await apiClient.get("/dashboard/stats");
      return response.data.data;
    } catch (error) {
      throw error?.response?.data?.message || "Failed to fetch channel stats";
    }
  }
);

const initialState = {
  active: [1, 0, 0],
  loading: false,
  stats: {
    id: null,
    totalViews: 0,
    totalVideos: 0,
    subscribersCount: 0,
    playlistsCount: 0,
    tweetsCount: 0,
    totalVideosLikes: 0,
    totalTweetsLikes: 0,
    totalCommentsLikes: 0
  }
};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannelStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChannelStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getChannelStats.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboard.reducer;
export const { setActive } = dashboard.actions;
export const selectLoading = (state) => state.dashboard.loading;
export const selectActive = (state) => state.dashboard.active;
export const selectStats = (state) => state.dashboard.stats;
