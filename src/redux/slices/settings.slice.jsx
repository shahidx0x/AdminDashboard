import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
  theme:'light'
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
    setThemeLight: (state) => {
      state.theme = 'light';
    },
    setThemeDark: (state) => {
      state.theme = 'dark';
    },
  },
});

export const { setSideBarOpen, setSideBarClose,setThemeLight,setThemeDark } = settingsSlice.actions;

export default settingsSlice.reducer;
