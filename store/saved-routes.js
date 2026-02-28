import { createSlice } from "@reduxjs/toolkit";

const savedRoutesSlice = createSlice({
  name: "savedRoutes",
  initialState: {
    routes: JSON.parse(localStorage.getItem("savedRoutes") || "[]"),
  },
  reducers: {
    saveRoute: (state, action) => {
      const exists = state.routes.some((r) => r.id === action.payload.id);
      if (!exists) {
        state.routes.push(action.payload);
        localStorage.setItem("savedRoutes", JSON.stringify(state.routes));
      }
    },
    removeRoute: (state, action) => {
      state.routes = state.routes.filter((r) => r.id !== action.payload.id);
      localStorage.setItem("savedRoutes", JSON.stringify(state.routes));
    },
  },
});

export const { saveRoute, removeRoute, clearRoutes } = savedRoutesSlice.actions;
export default savedRoutesSlice.reducer;
