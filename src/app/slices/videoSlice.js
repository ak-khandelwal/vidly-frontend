import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient, apiMultipartClient } from "../api/axiosInstance";
import { BASE_URL } from "../../constants/BASE_URL";
// Get all videos by userId
export const addVideo = createAsyncThunk(
  "addVideo",
  async ({ title, description, videoFile, thumbnail, tags = [] }) => {
    try {
      if (!title && !description && tags.length == 0) {
        throw new Error("title and description in  required");
      }
      if (!videoFile && !thumbnail) {
        throw new Error("video and thumbnail in  required");
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("videoFile", videoFile);
      formData.append("tags", JSON.stringify(tags));

      const response = await apiMultipartClient.post("videos/", formData);
      console.log(response);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
);
export const getVideos = createAsyncThunk(
  "getVideos",
  async ({ userId, sortBy, sortType, query, page, limit, tag }) => {
    try {
      const url = new URL(`${BASE_URL}/videos/`);

      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      if (tag) url.searchParams.set("tag", tag);
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const response = await apiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  },
);

export const getUserVideos = createAsyncThunk(
  "getUserVideos",
  async ({ page, limit }) => {
    try {
      const url = new URL(`${BASE_URL}/videos/user`);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      
      const response = await apiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }
);

export const togglePublishStatus = createAsyncThunk(
  "togglePublishStatus",
  async ({ videoId }) => {
    try {
      if (!videoId) throw new Error("videoId required");
      await apiClient.patch(`/videos/toggle/publish/${videoId}`);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
);
export const updateVideo = createAsyncThunk(
  "updateVideo",
  async ({ videoId, formData }) => {
    try {
      if (!videoId) throw new Error("videoId required");
      // Ensure tags are properly handled if they exist in formData
      if (formData.get("tags")) {
        const tags = formData.get("tags");
        // If tags is already a string (JSON), parse it
        const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        formData.set("tags", JSON.stringify(parsedTags));
      }
      const response = await apiMultipartClient.patch(
        `/videos/${videoId}`,
        formData,
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
);
export const deleteVideo = createAsyncThunk(
  "deleteVideo",
  async ({ videoId }) => {
    try {
      if (!videoId) throw new Error("videoId required");
      await apiClient.delete(`/videos/${videoId}`);
      return videoId;
    } catch (err) {
      console.error(err);
      throw new Error(err?.message || "Failed to delete video");
    }
  },
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
  },
);
export const getVideoLike = createAsyncThunk(
  "getVideoLike",
  async ({ videoId }) => {
    if (!videoId) {
      throw new Error("video id required");
    }
    const response = await apiClient.get(`/likes/video/${videoId}`);
    return response.data.data;
  },
);
export const likeVideo = createAsyncThunk("likeVideo", async ({ videoId }) => {
  try {
    if (!videoId) {
      throw new Error("video id is required");
    }
    await apiClient.post("/likes/toggle/v/" + videoId);
  } catch (err) {
    throw new Error(err);
  }
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
  },
);
export const addComment = createAsyncThunk(
  "addComment",
  async ({ videoId, content }) => {
    try {
      if (!videoId || !content) {
        throw new Error("videoid and content is required");
      }
      const response = await apiClient.post(`/comments/${videoId}`, {
        content,
      });
      return response.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  },
);


const initialState = {
  videos: [],
  videoError: false,
  videoCount: 0,
  hasMore: true,
  page: 1,
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
    incrementPageState: (state) => {
      state.page++
    },
    clearVideoState: (state) => {
      state.videos = [];
      state.videoError = false;
      state.videoCount = 0;
      state.hasMore = true;
      state.page = 1;
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
      state.commentCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideos.fulfilled, (state, action) => {
      const newVideos = action.payload.videos;
      state.videos.push(...newVideos);
      state.videoCount = action.payload.totalVideos;
      state.hasMore = state.videos.length < state.videoCount;
    });
    builder.addCase(getUserVideos.fulfilled, (state, action) => {
      const newVideos = action.payload.videos;
      state.videos.push(...newVideos);
      state.videoCount = action.payload.totalVideos;
      state.hasMore = state.videos.length < state.videoCount;
    });
    builder.addCase(getVideos.rejected, (state) => {
      state.videoError = true;
    });
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
export const { clearVideoState, clearCommentState, incrementPageState } = videoSlice.actions;
export const selectCurrentVideos = (state) => state.video.videos;
export const selectError = (state) => state.video.videoError;
export const selectCurrentVideosCount = (state) => state.video.videoCount;
export const selectCurrentHasMore = (state) => state.video.hasMore;
export const selectCurrentPage = (state) => state.video.page;

export const selectVideoPlay = (state) => state.video.videoPlay;
export const selectVideoLike = (state) => state.video.videoLike;
export const selectLiked = (state) => state.video.liked;

export const selectComments = (state) => state.video.comments;
export const selectHashMoreComments = (state) => state.video.hashMoreComments;
export const selectCommentsCount = (state) => state.video.commentCount;
