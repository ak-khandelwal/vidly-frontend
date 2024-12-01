import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../app/api/axiosInstance";
// Get all videos by userId
export const getUserPlaylist = createAsyncThunk(
  "getUserPlaylist",
 async ({ userId }) => {
        try {
      const response = await apiClient.get(`/playlist/user/${userId}`);
      console.log(response);
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }
);

const initialState = {
  playLists: [],
};

const PlayListSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    clearPlayListState: (state) => {
      state.playLists = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPlaylist.fulfilled, (state, action) => {
      state.playLists = action.payload
    });
  },
});

export default PlayListSlice.reducer;
export const { clearPlayListState } = PlayListSlice.actions;
export const selectCurrentPlayLists = (state) => state.playlist.playLists;
export const selectCurrentPlayListCount = (state) => state.playlist.totalPlaylists;
export const selectPlayListHasMore = (state) => state.playlist.hasMore;