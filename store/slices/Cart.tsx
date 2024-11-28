import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const checkOut = createAsyncThunk(
  "cart/checkout",
  async (items: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/booking/submit", { items });
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

interface ICartState {
  cartItems: any;
}

const initialState: ICartState = {
  cartItems: [],
};

export const cartState = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems = [action.payload, ...state.cartItems];
    },
    clearCart(state) {
      state.cartItems = [];
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item: any) => item.id != action.payload
      );
    },
  },
});

export const { addToCart, clearCart, removeCartItem } = cartState.actions;
