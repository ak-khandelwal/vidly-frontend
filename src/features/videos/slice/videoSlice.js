import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../app/api/axiosInstance";
import { BASE_URL } from "../../../constants/BASE_URL";
import { getSubscriber } from "../../subscribers/slice/SubscriberSlice";
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
export const getVideoById = createAsyncThunk(
  "getVideoById",
  async ({ videoId }) => {
    try {
      if (!videoId) {
        throw new Error("wrong videoId");
      }
      const response = await apiClient.get(`/videos/${videoId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }
);
export const getVideoLike = createAsyncThunk(
  "getVideoLike",
  async ({videoId}) => {
    if (!videoId) {
      throw new Error("video id required")
    }
    const response = await apiClient.get(`/likes/video/${videoId}`)
    return response.data.data;
  }
)
export const likeVideo = createAsyncThunk(
  "likeVideo",
  async ({videoId}) => {
    if (!videoId) {
      throw new Error("video id is required");
    }

    const response = await apiClient.post("/likes/toggle/v/"+videoId);
    console.log("likeVideo : ", response);
    return response;
  }
)

const initialState = {
  videos: [],
  videoPlay: {},
  videoPlayStatus: false,
  videoLike: 0,
  liked: false,
  subscribed: false,
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
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.videoPlay = action.payload;
      state.videoPlayStatus = true;
    });
    builder.addCase(getVideoLike.fulfilled, (state, action) => {
      console.log(action.payload);
      state.videoLike = action.payload.likeCount;
      state.liked = action.payload.likedByUser;
    });
    builder.addCase(getSubscriber.fulfilled, (state,action)=>{
      state.subscribed = action.payload.subscribeByUser
    })
  },
});

export default videoSlice.reducer;
export const { clearVideoState } = videoSlice.actions;
export const selectCurrentVideos = (state) => state.video.videos;
export const selectVideoPlay = (state) => state.video.videoPlay;
export const selectVideoPlayStatus = (state) => state.video.videoPlayStatus;
export const selectCurrentVideosCount = (state) => state.video.videoCount;
export const selectCurrentHasMore = (state) => state.video.hasMore;
export const selectVideoLike = (state) => state.video.videoLike;
export const selectLiked = (state) => state.video.liked;
export const selectSubscribed = (state) => state.video.subscribed;
