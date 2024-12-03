
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiClient } from "../../../app/api/axiosInstance";

export  const getChannelSubscribers = createAsyncThunk(
  "getChannelSubscribers",
  async ({channelId}) => {

    if(!channelId){
      throw new Error("channelId required");
    }
    const response = await apiClient(`/subscriptions/c/${channelId}`)
    return response.data.data
  }
)

const initialState = {
  ChannelSubscribers: [],
  SubscribedChannels: []
}

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers:{
    clearSubscriberState: (state)=>{
      state.ChannelSubscribers = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChannelSubscribers.fulfilled, (state,action) => {
      state.ChannelSubscribers = action.payload;
    })
  }
})

export default subscriberSlice.reducer;
export const {clearSubscriberState} = subscriberSlice.actions;
export const selectChannelSubscriber = (state) => state.subscriber.ChannelSubscribers