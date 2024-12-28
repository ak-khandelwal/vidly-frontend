
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiClient } from "../api/axiosInstance";

export  const getChannelSubscribers = createAsyncThunk(
  "getChannelSubscribers",
  async ({channelId}) => {

    if(!channelId){
      throw new Error("channelId required");
    }
    const response = await apiClient.get(`/subscriptions/c/${channelId}`)
    return response.data.data
  }
)

export const toggleSubscription = createAsyncThunk(
  "toggleSubscription",
  async ({channelId}) => {
   try {
    if(!channelId){
      throw new Error("channelId required");
    }
    await apiClient.post(`/subscriptions/c/${channelId}`);
   } catch (error) {
    console.log(error);
   }
  }
)

export const getSubscribedChannel = createAsyncThunk(
  "getSubscribedChannel",
  async () => {
    const res = await apiClient("/subscriptions/")
    return res.data.data;
  }
)

const initialState = {
  ChannelSubscribers: [],
  SubscribedChannels: [],
}

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers:{
    clearSubscriberState: (state)=>{
      state.ChannelSubscribers = [];
      state.SubscribedChannels = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChannelSubscribers.fulfilled, (state,action) => {
      state.ChannelSubscribers = action.payload;
    })
    builder.addCase(getSubscribedChannel.fulfilled, (state, action) => {
      state.SubscribedChannels = action.payload;
    })
  }
})

export default subscriberSlice.reducer;
export const {clearSubscriberState} = subscriberSlice.actions;
export const selectChannelSubscriber = (state) => state.subscriber.ChannelSubscribers;
export const selectSubscribedChannels =(state) => state.subscriber.SubscribedChannels;
