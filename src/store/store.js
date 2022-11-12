import { configureStore } from "@reduxjs/toolkit";
import { uiSlice,authSlice } from "./";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
