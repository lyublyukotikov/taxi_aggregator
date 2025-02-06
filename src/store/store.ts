import { configureStore } from "@reduxjs/toolkit";
import { tripApi } from "@/services/api";


export const store = configureStore({
  reducer: {
    [tripApi.reducerPath]: tripApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tripApi.middleware)
      
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
