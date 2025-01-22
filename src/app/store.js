import { configureStore } from '@reduxjs/toolkit';
import leaveReducer from '../features/leaveSlice';

const store = configureStore({
  reducer: {
    leave: leaveReducer,
  },
});

export default store;