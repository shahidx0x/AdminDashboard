import { combineReducers } from "redux";
import dashbordSlice from "./slices/dashbord.slice";
import settingsSlice from "./slices/settings.slice";
import userSlices from "./slices/user.slices";

export const rootReducer = combineReducers({
  user: userSlices,
  settings: settingsSlice,
  dashbord: dashbordSlice,
});
