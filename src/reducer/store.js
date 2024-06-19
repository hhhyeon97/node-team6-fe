import { configureStore } from '@reduxjs/toolkit';
import listReducer from './listReducer';
import userReducer from './userReducer';
const store = configureStore({
  reducer: {
    list: listReducer,
    user: userReducer,
  },
});
export default store;
