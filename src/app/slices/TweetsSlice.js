import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../api/axiosInstance";

export const getTweets = createAsyncThunk("getTweets", async ({ userId }) => {
  try {
    if (!userId) {
      throw new Error("userId required");
    }
    const response = await apiClient(`/tweets/user/${userId}`);
    return response.data.data;
  } catch (err) {
    throw new Error(err);
  }
});

export const addTweets = createAsyncThunk("addTweets", async ({ content }) => {
  try {
    if (!content) {
      throw new Error("tweet content is required");
    }
    await apiClient.post(`/tweets/`, { content });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

export const editTweet = createAsyncThunk("editTweet", async ({ tweetId, content }) => {
  try {
    if (!tweetId || !content) {
      throw new Error("tweetId and content are required");
    }
    const response = await apiClient.patch(`/tweets/${tweetId}`, { content });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

export const deleteTweet = createAsyncThunk("deleteTweet", async ({ tweetId }) => {
  try {
    if (!tweetId) {
      throw new Error("tweetId is required");
    }
    await apiClient.delete(`/tweets/${tweetId}`);
    return tweetId;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

const initialState = {
  tweets: [],
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    clearTweetState: (state) => {
      state.tweets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTweets.fulfilled, (state, action) => {
        state.tweets = action.payload;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.tweets = state.tweets.filter(tweet => tweet._id !== action.payload);
      })
      .addCase(editTweet.fulfilled, (state, action) => {
        const index = state.tweets.findIndex(tweet => tweet._id === action.payload._id);
        if (index !== -1) {
          state.tweets[index] = action.payload;
        }
      });
  },
});

export default tweetSlice.reducer;
export const { clearTweetState } = tweetSlice.actions;
export const selectTweets = (state) => state.tweet.tweets;
