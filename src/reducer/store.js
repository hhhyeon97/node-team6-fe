import { configureStore } from '@reduxjs/toolkit';
import listReducer from './listReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';
import noticeReducer from './noticeReducer';

const store = configureStore({
  reducer: {
    list: listReducer,
    user: userReducer,
    review: reviewReducer,
    notice: noticeReducer,
  },
});
export default store;
