import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../api/axiosInstance";
// Get all videos by userId
export const getUserPlaylists = createAsyncThunk(
  "getUserPlaylists",
  async ({ userId }) => {
    try {
      const response = await apiClient.get(`/playlist/user/${userId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  },
);

export const getPlaylist = createAsyncThunk(
  "getPlaylist",
  async ({ playListId }) => {
    try {
      const response = await apiClient.get(`/playlist/${playListId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  },
);
const initialState = {
  playLists: [],
  playList: {},
};

const PlayListSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    clearPlayListState: (state) => {
      state.playLists = [];
      state.playList = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPlaylists.fulfilled, (state, action) => {
      state.playLists = action.payload;
    });
  },
});

export default PlayListSlice.reducer;
export const { clearPlayListState } = PlayListSlice.actions;
export const selectCurrentPlayLists = (state) => state.playlist.playLists;
export const selectPlayList = (state) => state.playlist.playList;
