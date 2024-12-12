
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiClient } from "../../../app/api/axiosInstance";

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
    const res = await apiClient.post(`/subscriptions/c/${channelId}`);
    console.log(res);

   } catch (error) {
    console.log(error);
   }
  }
)

export const getSubscriber = createAsyncThunk(
  "getSubscriber",
  async ({channelId}) => {
   try {
    if(!channelId){
      throw new Error("channelId required");
    }
    const response = await apiClient.get(`/subscriptions/${channelId}`);
    console.log(response.data.data);

    return response.data.data;
   } catch (error) {
    console.log(error);
   }
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