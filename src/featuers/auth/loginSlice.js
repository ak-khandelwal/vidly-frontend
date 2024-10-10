import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  username: null,
  email: null,
  status: 'idle',
  error: null,
};

const loginUserRequest = createAsyncThunk(
  "loginUser/loginUserRequest",
  async ({ username, email, password},{rejectWithValue}) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BASE_URL}/users/login`,
      data: {
        username,
        email,
        password,
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to register user");
  }
})

const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState,
  extraReducers: (builder) =>{
    builder.addCase(loginUserRequest.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    builder.addCase(loginUserRequest.fulfilled, (state,action) => {
      state.status = 'succeeded';
      state.username = action.payload.username;
      state.email = action.payload.email;
    })
    builder.addCase(loginUserRequest.rejected, (state,action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    })
  }
})

export default loginUserSlice.reducer