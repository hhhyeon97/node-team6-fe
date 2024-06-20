import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
// import PrivateRoute from "./PrivateRoute";
import ListPage from '../pages/ListPage';
import RegisterPage from '../pages/RegisterPage';
import PerformanceDetail from '../pages/PerformanceDetail';
import LoginPage from '../pages/LoginPage';
import MyPageLayout from '../Layout/AppLayout'
import ReservationByDate from '../pages/mypage/ReservationByDate'
import ViewAllReservations from "../pages/mypage/ViewAllReservations";
import MyReviews from "../pages/mypage/MyReviews";
import EditProfile from "../pages/mypage/EditProfile";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={< />} /> */}
      <Route path="/performance" element={<ListPage />} />
      <Route path="/performance/:id" element={<PerformanceDetail />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mypage" element={<MyPageLayout />}>
        <Route index element={<Navigate to="reservations/by-date" />} />
        <Route path="reservations/by-date" element={<ReservationByDate />} />
        <Route path="reservations/view-all" element={<ViewAllReservations />} />
        <Route path="reviews" element={<MyReviews />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
