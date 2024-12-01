import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../app/api/axiosInstance";
import { BASE_URL } from "../../../constants/BASE_URL";
// Get all videos by userId
export const getUserVideos = createAsyncThunk(
  "getUserVideos",
 async ({ userId, sortBy, sortType, query, page, limit }) => {
        try {
            const url = new URL(`${BASE_URL}/videos/`);

            if (userId) url.searchParams.set("userId", userId);
            if (query) url.searchParams.set("query", query);
            if (page) url.searchParams.set("page", page);
            if (limit) url.searchParams.set("limit", limit);
            if (sortBy && sortType) {
                url.searchParams.set("sortBy", sortBy);
                url.searchParams.set("sortType", sortType);
            }
      const response = await apiClient.get(url);
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
