import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiClient } from "../api/axiosInstance";
export const getChannel = createAsyncThunk("getChannel", async (userName) => {
  try {
    const response = await apiClient.get(`users/channel/${userName}`);
    return response.data.data;
  } catch (error) {
    toast.error("Failed to get channel");
    throw error?.message || error;
  }
});

const initialState = {
  channel: null,
  active: [1, 0, 0, 0],
  loading: false,
};

const channel = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChannel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChannel.fulfilled, (state, action) => {
      state.channel = action.payload;
      state.loading = false;
    });
  },
});

export default channel.reducer;
export const { setActive } = channel.actions;
export const selectCurrentChannel = (state) => state.channel.channel;
export const selectLoading = (state) => state.channel.loading;
export const selectActive = (state) => state.channel.active;
