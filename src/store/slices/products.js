import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios.js";

const initialState = {
  addNewProductResponse: {
    isLoading: false,
    response: {},
  },
};

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async () => {
    try {
      await axios.get("/admin/addProduct").then((response) => {
        return response.data;
      });
    } catch (error) {
      throw error;
    }
  }
);

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state, actions) => {
        state.addNewProductResponse.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, actions) => {
        state.addNewProductResponse.data = actions.payload;
        state.addNewProductResponse.isLoading = false;
      });
  },
});

export default products.reducer;
