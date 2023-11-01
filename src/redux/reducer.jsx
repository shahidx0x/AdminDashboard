import { combineReducers } from "redux";

import userSlices from "./slices/user.slices";

export const rootReducer = combineReducers({
  user: userSlices,
});
