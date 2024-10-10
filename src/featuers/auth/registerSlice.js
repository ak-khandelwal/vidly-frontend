import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import defaultAvatar from "../../assets/auth/avatar.png";
import defaultCover from "../../assets/auth/cover.png";

const initialState = {
  fullname: null,
  username: null,
  email: null,
  avatar: null,
  coverImage: null,
  status: 'idle',
  error: null,
};

export const registerUserRequest = createAsyncThunk(
  "registerUser/registerUserRequest",
  async ({ fullname, username, email, password },{rejectWithValue}) => {
  try {
    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

        // Fetch the default images as Blob
        const avatarResponse = await fetch(defaultAvatar);
        const avatarBlob = await avatarResponse.blob();
        formData.append('avatar', avatarBlob, 'avatar.png');  // Append the blob as avatar

        const coverResponse = await fetch(defaultCover);
        const coverBlob = await coverResponse.blob();
        formData.append('coverImage', coverBlob, 'cover.png');  // Append the blob as cover

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'  // Required for file upload
      }
    });
    console.log(response);
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to register user");
  }
})

const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  extraReducers: (builder) =>{
    builder.addCase(registerUserRequest.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    builder.addCase(registerUserRequest.fulfilled, (state,action) => {
      state.status = 'succeeded';
      state.fullname = action.payload.fullname;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.coverImage = action.payload.coverImage;
      console.log(state);

    })
    builder.addCase(registerUserRequest.rejected, (state,action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    })
  }
})

export default registerUserSlice.reducer