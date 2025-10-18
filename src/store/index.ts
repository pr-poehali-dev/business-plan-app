import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import businessPlansReducer from './slices/businessPlansSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    businessPlans: businessPlansReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
