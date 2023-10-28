import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
});

export const { saveProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
