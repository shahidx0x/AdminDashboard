import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
  theme: "light",
  header: true,
  hover: true,
  compact: true,
  autoHeight: true,
  bordered: true,
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
      state.theme = "light";
    },
    setThemeDark: (state) => {
      state.theme = "dark";
    },
    setTableHeader: (state) => {
      state.header = !state.header;
    },
    setTableHover: (state) => {
      state.hover = !state.hover;
    },
    setTableCompact: (state) => {
      state.compact = !state.compact;
    },
    setTableAutoHeight: (state) => {
      state.autoHeight = !state.autoHeight;
    },
    setTableBordered: (state) => {
      state.bordered = !state.bordered;
    },
  },
});

export const {
  setSideBarOpen,
  setSideBarClose,
  setThemeLight,
  setThemeDark,
  setTableAutoHeight,
  setTableBordered,
  setTableCompact,
  setTableHeader,
  setTableHover,
} = settingsSlice.actions;

export default settingsSlice.reducer;
