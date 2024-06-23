import { configureStore } from '@reduxjs/toolkit';
import listReducer from './listReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';

const store = configureStore({
  reducer: {
    list: listReducer,
    user: userReducer,
    review: reviewReducer,
  },
});
export default store;
