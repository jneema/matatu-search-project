import { configureStore } from "@reduxjs/toolkit";
import savedRoutesReducer from "./saved-routes";

export const store = configureStore({
  reducer: {
    savedRoutes: savedRoutesReducer,
  },
});