import { configureStore } from '@reduxjs/toolkit';
import listReducer from './listReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';
import reservationReducer from './reservationReducer'
import noticeReducer from './noticeReducer';

const store = configureStore({
  reducer: {
    list: listReducer,
    user: userReducer,
    review: reviewReducer,
    reservation: reservationReducer,
    notice: noticeReducer,
  },
});
export default store;
