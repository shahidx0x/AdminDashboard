import { combineReducers } from "redux";

import settingsSlice from "./slices/settings.slice";
import userSlices from "./slices/user.slices";

export const rootReducer = combineReducers({
  user: userSlices,
  settings: settingsSlice,
});
