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
      console.log(response)
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  },
);

export const addVideoToPlaylist = createAsyncThunk(
  "addVideoToPlaylist",
  async ({playlistId, videoId}) => {
    try {
      if(!playlistId && !videoId) throw new Error("playlistId and videoId is required")
      
      await apiClient.patch(`playlist/add/${videoId}/${playlistId}`);
    } catch (err) {
      console.log(err)
      throw new Error(err);
    }
  }
)

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
    builder.addCase(getPlaylist.fulfilled, (state, action) => {
      state.playList = action.payload;
    });
  },
});

export default PlayListSlice.reducer;
export const { clearPlayListState } = PlayListSlice.actions;
export const selectCurrentPlayLists = (state) => state.playlist.playLists;
export const selectPlayList = (state) => state.playlist.playList;
