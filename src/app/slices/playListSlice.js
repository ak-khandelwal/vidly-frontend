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

export const createPlaylist = createAsyncThunk(
  "createPlaylist",
  async ({ title, description }) => {
    try {
      if (!title || !description) throw new Error("Title and description are required");
      
      const response = await apiClient.post("/playlist", { title, description });
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "deletePlaylist",
  async ({ playlistId }) => {
    try {
      if (!playlistId) throw new Error("Playlist ID is required");
      
      await apiClient.delete(`/playlist/${playlistId}`);
      return playlistId;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }
);

const initialState = {
  playLists: [],
  playList: {},
  loading: false,
  error: null
};

const PlayListSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    clearPlayListState: (state) => {
      state.playLists = [];
      state.playList = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.playLists = action.payload;
        state.loading = false;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.playList = action.payload;
        state.loading = false;
      })
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playLists.push(action.payload);
        state.loading = false;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.playLists = state.playLists.filter(
          (playlist) => playlist._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default PlayListSlice.reducer;
export const { clearPlayListState } = PlayListSlice.actions;
export const selectCurrentPlayLists = (state) => state.playlist.playLists;
export const selectPlayList = (state) => state.playlist.playList;
