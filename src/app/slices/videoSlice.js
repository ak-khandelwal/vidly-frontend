import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../api/axiosInstance";
import { BASE_URL } from "../../constants/BASE_URL";
// Get all videos by userId
export const getVideos = createAsyncThunk(
  "getVideos",
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
  async ({ videoId }) => {
    if (!videoId) {
      throw new Error("video id required");
    }
    const response = await apiClient.get(`/likes/video/${videoId}`);
    return response.data.data;
  }
);
export const likeVideo = createAsyncThunk("likeVideo", async ({ videoId }) => {
  if (!videoId) {
    throw new Error("video id is required");
  }

  const response = await apiClient.post("/likes/toggle/v/" + videoId);
  return response;
});
export const getComments = createAsyncThunk(
  "getComments",
  async ({ videoId, page, limit }) => {
    try {
      if (!videoId) {
        throw new Error("wrong videoId");
      }
      const url = new URL(`${BASE_URL}/comments/${videoId}`);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      const response = await apiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }
);
export const addComment = createAsyncThunk(
  "addComment",
  async ({videoId, content}) => {
    try {
      if(!videoId || !content){
        throw new Error("videoid and content is required")
      }
      const response = await apiClient.post(`/comments/${videoId}`, {content})
      return response.data
    } catch (error) {
      throw new Error(error?.message || error)
    }
  }
)

const initialState = {
  videos: [],
  videoError: false,
  videoCount: 0,
  hasMore: true,
  videoPlay: {},
  videoLike: 0,
  liked: false,
  comments: [],
  hashMoreComments: true,
  commentCount: 0,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    clearVideoState: (state) => {
      state.videos = [];
      state.videoError = false;
      state.videoCount = 0;
      state.hasMore = true;
      state.videoPlay = {};
      state.videoPlayStatus = false;
      state.videoLike = 0;
      state.subscribed = false;
      state.subscribers = 0;
      state.liked = false;
    },
    clearCommentState: (state) => {
      state.comments = [];
      state.hashMoreComments = true;
      state.commentCount  = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideos.fulfilled, (state, action) => {
      const newVideos = action.payload.videos;
      state.videos.push(...newVideos);
      state.videoCount = action.payload.totalVideos;
      state.hasMore = state.videos.length < state.videoCount;
    });
    builder.addCase(getVideos.rejected, (state) => {
     state.videoError = true; 
    })
    builder.addCase(getComments.fulfilled, (state, action) => {
      const newComments = action.payload.comments;
      state.comments.push(...newComments);
      state.commentCount = action.payload.totalComments;
      state.hashMoreComments = state.comments.length < state.commentCount;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.videoPlay = action.payload;
      state.videoPlayStatus = true;
    });
    builder.addCase(getVideoLike.fulfilled, (state, action) => {
      state.videoLike = action.payload.likeCount;
      state.liked = action.payload.likedByUser;
    });
  },
});

export default videoSlice.reducer;
export const { clearVideoState, clearCommentState } = videoSlice.actions;
export const selectCurrentVideos = (state) => state.video.videos;
export const selectError = (state) => state.video.videoError;
export const selectCurrentVideosCount = (state) => state.video.videoCount;
export const selectCurrentHasMore = (state) => state.video.hasMore;

export const selectVideoPlay = (state) => state.video.videoPlay;
export const selectVideoLike = (state) => state.video.videoLike;
export const selectLiked = (state) => state.video.liked;

export const selectComments = (state) => state.video.comments;
export const selectHashMoreComments = (state) => state.video.hashMoreComments;
export const selectCommentsCount = (state) => state.video.commentCount;
