import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_count: 0,
  company_count: 0,
  product_count: 0,
};

const dashbordSlice = createSlice({
  name: "dashbord_status",
  initialState,
  reducers: {
    setUserCount: (state, action) => {
  
      state.user_count = action.payload;
    },
    setCompanyCount: (state, action) => {
      state.company_count = action.payload;
    },
    setProductCount: (state, action) => {
      state.product_count = action.payload;
    },
  },
});

export const { setUserCount, setCompanyCount, setProductCount } =
  dashbordSlice.actions;

export default dashbordSlice.reducer;
