import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getAllBookings = createAsyncThunk(
  "user/getAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bookings`);
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

interface IBookingListState {
  bookingList: any;
}

const initialState: IBookingListState = {
  bookingList: [],
};

export const allBookingsState = createSlice({
  name: "allBookingsState",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.bookingList = action.payload;
    });
  },
});
