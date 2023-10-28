import { combineReducers } from "redux";
import productSlice from "./slices/product.slice";
import userSlices from "./slices/user.slices";
import userInfoEditSlice from "./slices/userInfoEdit.slice";

export const rootReducer = combineReducers({
  user: userSlices,
  product: productSlice,
  userInfoEdit: userInfoEditSlice,
});
