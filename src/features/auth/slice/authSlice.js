import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFormData } from "../utils/createFormData";
import { apiClient, apiMultipartClient } from "../../../app/api/axiosInstance";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (
    { fullName, userName, email, password, avatarBlob, coverBlob },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName)
      formData.append("userName", userName)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("avatar", avatarBlob, 'default-avatar.png')
      formData.append("coverImage", coverBlob, 'default-cover.png')
      const response = await apiMultipartClient.post(
        "/users/register",
        formData
      );
      toast.success("Register successfully")
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "failed to register user";
      return rejectWithValue(errorMessage);
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/users/login", {
        userName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      const errorMessage =
        error.response?.data?.message || "failed to login user";
      return rejectWithValue(errorMessage);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "logoutUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await apiClient.post("/users/logout", {});
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "failed to logout user";
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateAccountDetails = createAsyncThunk(
  "updateAccountDetails",
  async ({ fullName, email }, { rejectWithValue }) => {
    try {
      const formData = createFormData({ fullName, email });
      const response = await apiClient.patch("/users/update-account", formData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "failed to update account details";
      return rejectWithValue(errorMessage);
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  "currentUser",
  async () => {
    try {
      const response = await apiClient.get("/users/current-user");
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "failed to get current user";
      return errorMessage
    }
  }
);
export const passwordChange = createAsyncThunk(
  "passwordChange",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const formData = createFormData({ oldPassword, newPassword });
      const response = await apiClient.post("/users/change-password", formData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "failed to change password";
      return rejectWithValue(errorMessage);
    }
  }
);
export const RefreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async ({ rejectWithValue }) => {
    try {
      const response = await apiClient.post("/users/refresh-token", {});
      return response.data.accessToken;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "failed to refresh access token";
      return rejectWithValue(errorMessage);
    }
  }
);
export const avatarUpdate = createAsyncThunk(
  "avatarUpdate",
  async ({ avatar }, { rejectWithValue }) => {
    try {
      const formData = createFormData({ avatar });
      const response = await apiMultipartClient.patch("/users/update-avatar", formData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "failed to update avatar";
      return rejectWithValue(errorMessage);
    }
  }
);
export const coverImageUpdate = createAsyncThunk(
  "CoverImageUpdate",
  async ({ coverImage }, { rejectWithValue }) => {
    try {
      const formData = createFormData({ coverImage });
      const response = await apiMultipartClient.patch("/users/update-CoverImage", formData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "failed to update cover image";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  user: null,
  status: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.status = true;
      toast.success("login successfully")
    });
    builder.addCase(updateAccountDetails.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(avatarUpdate.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(coverImageUpdate.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.status = true;
    });
  },
});

export const { resetStatus, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentStatus = (state) => state.auth.status