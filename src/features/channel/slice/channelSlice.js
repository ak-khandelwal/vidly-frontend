import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import {apiClient} from "../../../app/api/axiosInstance"
export const getChannel = createAsyncThunk(
  "getChannel",
  async (userName) => {
    try {
      const response = await apiClient.get("users/channel/"+userName);
      console.log(response);

      return response.data.data;
    } catch (error) {
      console.log(error);

      toast.error("Failed to get channel");
      throw error?.message || error;
    }
  }
)

const initialState = {
  channel: null,
  loading: false,
}

const channel = createSlice({
  name: 'channel',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getChannel.pending, (state) =>{
      state.loading = true;
    })
    builder.addCase(getChannel.fulfilled, (state,action) =>{
      state.channel = action.payload;
      state.loading = false;
      console.log(state);
    })
  }
})

export default channel.reducer;

export const selectCurrentChannel = (state) => state.channel.channel;
export const selectLoading = (state) => state.channel.loading;
