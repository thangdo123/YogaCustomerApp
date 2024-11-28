import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getAllYogaClassByCourse = createAsyncThunk(
  "user/getAllYogaClassByCourse",
  async (courseId: number) => {
    try {
      const response = await axiosInstance.get(`/yogaClasses/${courseId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

interface IAllYogaClassState {
  yogaClassesByCourse: any;
}

const initialState: IAllYogaClassState = {
  yogaClassesByCourse: null,
};

export const allYogaClassByCourseState = createSlice({
  name: "allYogaClassByCourseState",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllYogaClassByCourse.fulfilled, (state, action) => {
      state.yogaClassesByCourse = action.payload;
    });
  },
});
