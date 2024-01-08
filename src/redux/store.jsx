import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import createMigrate from "redux-persist/es/createMigrate";
const migrations = {
  0: (state) => {
    return {
      ...state,
      maintain: false,
    };
  },
};
const persistConfig = {
  key: "persist-key",
  storage,
  version: 0,
  debug: true,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: true }),
};
const persist_reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persist_reducer,
});
const parsistor = persistStore(store);
export default store;
export { parsistor };
