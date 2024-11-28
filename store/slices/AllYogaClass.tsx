import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const searchYogaClass = createAsyncThunk(
  "user/searchYogaClass",
  async (input: string) => {
    try {
      const response = await axiosInstance.get(
        `/allYogaClass/byCourseSchedule?searchInput=${input}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getAllYogaClass = createAsyncThunk(
  "user/getAllYogaClass",
  async (_) => {
    try {
      const response = await axiosInstance.get(`/allYogaClass`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

interface IAllYogaClassState {
  yogaClasses: any;
}

const initialState: IAllYogaClassState = {
  yogaClasses: null,
};

export const allYogaClassState = createSlice({
  name: "allYogaClassState",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllYogaClass.fulfilled, (state, action) => {
      state.yogaClasses = action.payload;
    });
    builder.addCase(searchYogaClass.fulfilled, (state, action) => {
      state.yogaClasses = action.payload;
    });
  },
});
