import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getAllYogaCourse = createAsyncThunk(
  "user/getAllYogaCourse",
  async (_) => {
    try {
      const response = await axiosInstance.get("/allYogaCourse");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface IAllYogaCourseState {
  yogaCourses: any;
}

const initialState: IAllYogaCourseState = {
  yogaCourses: null,
};

export const allYogaCourseState = createSlice({
  name: "allYogaCourseState",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllYogaCourse.fulfilled, (state, action) => {
      state.yogaCourses = action.payload;
    });
  },
});
