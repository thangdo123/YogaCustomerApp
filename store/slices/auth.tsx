import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { storeToken } from "../../utils/token.utils";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("signUp", { email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        code: error.code,
        response: error.response ? error.response.data : null,
      });
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/signIn", { email, password });
      storeToken(response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        code: error.code,
        response: error.response ? error.response.data : null,
      });
    }
  }
);

interface IAuthState {
  isSignedIn: boolean;
  isSignedOut: boolean;
}

const initialState: IAuthState = {
  isSignedIn: false,
  isSignedOut: false,
};

export const authState = createSlice({
  name: "authState",
  initialState,
  reducers: {
    signOut(state) {
      state.isSignedOut = true;
      state.isSignedIn = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isSignedIn = true;
      state.isSignedOut = false;
    });
  },
});

export const { signOut } = authState.actions;
