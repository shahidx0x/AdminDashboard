import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSideBarOpen: (state) => {
      state.isSidebarOpen = true;
    },
    setSideBarClose: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { setSideBarOpen, setSideBarClose } = settingsSlice.actions;

export default settingsSlice.reducer;
