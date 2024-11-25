import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFormData } from "../utils/createFormData";
import { apiClient, apiMultipartClient } from "../../../app/api/axiosInstance";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ fullName, userName, email, password, avatarBlob, coverBlob }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatarBlob, "default-avatar.png");
      formData.append("coverImage", coverBlob, "default-cover.png");
      const response = await apiMultipartClient.post(
        "/users/register",
        formData
      );
      toast.success("Register successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to register User plz try again");
      throw error?.message || error;
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ userName, email, password }) => {
    try {
      const response = await apiClient.post("/users/login", {
        userName,
        email,
        password,
      });
      toast.success("successfully login");
      return response.data;
    } catch (error) {
      console.log("error", error);
      toast.error("failed to login user");
      throw error?.message || error;
    }
  }
);
export const logoutUser = createAsyncThunk("logoutUser", async () => {
  try {
    const response = await apiClient.post("/users/logout");
    toast.success("Successfully logout");
    return response.data;
  } catch (error) {
    toast.error("Failed to logout");
    throw error?.message || error;
  }
});
export const updateAccountDetails = createAsyncThunk(
  "updateAccountDetails",
  async ({ fullName, email }) => {
    try {
      const formData = createFormData({ fullName, email });
      const response = await apiClient.patch(
        "/users/update-Account-Details",
        formData
      );
      toast.success("Successfully update your details");
      return response.data;
    } catch (error) {
      toast.error("failed to update account details");
      throw error?.message || error;
    }
  }
);
export const getCurrentUser = createAsyncThunk("currentUser", async () => {
  try {
    const response = await apiClient.get("/users/current-user");
    return response.data;
  } catch (error) {
    throw error.message;
  }
});
export const passwordChange = createAsyncThunk(
  "passwordChange",
  async ({ oldPassword, newPassword }) => {
    try {
      const formData = createFormData({ oldPassword, newPassword });
      const response = await apiClient.post("/users/change-password", formData);
      toast.success("successfully changed password");
      return response.data;
    } catch (error) {
      toast.error("failed changed password");
      throw error?.message || error;
    }
  }
);
export const RefreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async () => {
    try {
      await apiClient.post("/users/refresh-token", {});
    } catch (error) {
      throw error?.message || error;
    }
  }
);
export const avatarUpdate = createAsyncThunk(
  "avatarUpdate",
  async ({ avatar }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await apiMultipartClient.patch(
        "/users/update-Avatar",
        formData
      );
      toast.success("successfully changed avatar image");
      return response.data.data;
    } catch (error) {
      toast.error("failed to update avatar image");
      throw error?.message || error;
    }
  }
);
export const coverImageUpdate = createAsyncThunk(
  "CoverImageUpdate",
  async ({ coverImage }) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      const response = await apiMultipartClient.patch(
        "/users/update-CoverImage",
        formData
      );
      toast.success("successfully changed cover image");
      return response.data.data;
    } catch (error) {
      toast.error("failed to update cover image");
      console.log(error);
      throw error;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.status = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.status = false;
    });
    builder.addCase(updateAccountDetails.fulfilled, (state, action) => {
      state.user = action.payload.data;
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
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.user = null;
      state.status = false;
    });
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentStatus = (state) => state.auth.status;
