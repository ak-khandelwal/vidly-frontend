import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../app/api/axiosInstance";

// Get all videos by userId
export const getUserVideos = createAsyncThunk(
  "getUserVideos",
  async ({ userId, page = 1, limit = 9 }) => {
    try {
      if (!userId) throw new Error("UserId is required");
      const response = await apiClient.get(
        `/videos/?userId=${userId}&page=${page}&limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }
);

const initialState = {
  videos: [],
  videoCount: 0,
  hasMore: true,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    clearVideoState: (state) => {
      state.videoCount = 0;
      state.videos = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserVideos.fulfilled, (state, action) => {
      const newVideos = action.payload.videos;
      state.videos.push(...newVideos);
      state.videoCount = action.payload.totalVideos;
      state.hasMore = state.videos.length < state.videoCount;
    });
  },
});

export default videoSlice.reducer;
export const { clearVideoState } = videoSlice.actions;
export const selectCurrentVideos = (state) => state.video.videos;
export const selectCurrentVideosCount = (state) => state.video.videoCount;
export const selectCurrentHasMore = (state) => state.video.hasMore;
