import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  togol: false,
  data: { id: "345" },
};

const userInfoEditSlice = createSlice({
  name: "userInfoEdit",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    openTogol: (state) => {
      state.togol = true;
    },
    closeTogol: (state) => {
      state.togol = false;
    },
    resetData: (state) => {
      state.data = null;
    },
  },
});

export const { setData, openTogol, closeTogol, resetData } =
  userInfoEditSlice.actions;

export default userInfoEditSlice.reducer;
