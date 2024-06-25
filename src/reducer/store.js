import { configureStore } from '@reduxjs/toolkit';
import listReducer from './listReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';
import reservationReducer from './reservationReducer'
import noticeReducer from './noticeReducer';
import likeReducer from './likeReducer';

const store = configureStore({
  reducer: {
    list: listReducer,
    user: userReducer,
    review: reviewReducer,
    reservation: reservationReducer,
    notice: noticeReducer,
    like:likeReducer,
  },
});
export default store;
