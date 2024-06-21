import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
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
import AdminPageLayout from '../Layout/AdminPageLayout';

const AppRouter = () => {
  const navigate = useNavigate();

  // /mypage로 접근 시, /mypage/reservations/by-date 로 리디렉션
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/mypage') {
      navigate('/mypage/reservations/by-date');
    }
  }, [navigate]);

  return (
    <Routes>
      {/* <Route path="/" element={< />} /> */}
      <Route path="/performance" element={<ListPage />} />
      <Route path="/performance/:id" element={<PerformanceDetail />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mypage/reservations/by-date" element={<ReservationByDate/>} />
      <Route path="/mypage/reservations/view-all" element={<ViewAllReservations />} />
      <Route path="/mypage/reviews" element={<MyReviews />} />
      <Route path="/mypage/edit-profile" element={<EditProfile />} />
      <Route path="/admin-page" element={<AdminPageLayout />} />
    </Routes>
  );
};

export default AppRouter;
