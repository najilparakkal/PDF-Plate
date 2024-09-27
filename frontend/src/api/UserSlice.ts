import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./Service"; // Assuming you have this function implemented to call your backend API
import { IUserState } from "./Interfaces";
import Cookies from "js-cookie";

const initialState: IUserState = {
  userName: null,
  email: null,
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (
    userData: { userName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await registerUser(userData);
      if (response.status === 204) {
        throw new Error("User already exists");
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUser(userData);

      if (response?.status === 204) {
        throw new Error("Password is incorrect");
      }
      if (response?.status === 404) {
        throw new Error("User not found");
      }

      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userName = null;
      state.email = null;
      state.status = "idle"; 
      state.error = null; 
      Cookies.remove("jwt"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
        Cookies.set("jwt", action.payload.accessToken);

        state.status = "success";
        state.userName = action.payload.newUser.userName;
        state.email = action.payload.newUser.email;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.userName = action.payload.userDetails.userName;
        state.email = action.payload.userDetails.email;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
  
});
export const { logout } = userSlice.actions;


export default userSlice.reducer;
