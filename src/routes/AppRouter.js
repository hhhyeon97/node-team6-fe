import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
// import PrivateRoute from "./PrivateRoute";
import ListPage from '../pages/ListPage';
import RegisterPage from '../pages/RegisterPage';
import PerformanceDetail from '../pages/PerformanceDetail';
import LoginPage from '../pages/LoginPage';
import MyPageLayout from '../Layout/AppLayout';
import ReservationByDate from '../pages/mypage/ReservationByDate';
import ViewAllReservations from '../pages/mypage/ViewAllReservations';
import MyReviews from '../pages/mypage/MyReviews';
import EditProfile from '../pages/mypage/EditProfile';
import AdminUserPage from '../pages/admin_page/AdminUserPage';
import AdminReviewPage from '../pages/admin_page/AdminReviewPage';
import AdminNoticePage from '../pages/admin_page/AdminNoticePage';
import MainPage from '../pages/MainPage';
import ReservationPage from '../pages/ReservationPage';

const AppRouter = () => {
  const navigate = useNavigate();

  // redirection
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/mypage') {
      navigate('/mypage/reservations/by-date');
    }
    if (path === '/admin') {
      navigate('/admin/user');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/performance" element={<ListPage />} />
      <Route path="/performance/:id" element={<PerformanceDetail />} />
      <Route path='/reservation/:id' element={<ReservationPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/mypage/reservations/by-date"
        element={<ReservationByDate />}
      />
      <Route
        path="/mypage/reservations/view-all"
        element={<ViewAllReservations />}
      />
      <Route path="/mypage/reviews" element={<MyReviews />} />
      <Route path="/mypage/edit-profile" element={<EditProfile />} />
      <Route path="/admin/user" element={<AdminUserPage />} />
      <Route path="/admin/review" element={<AdminReviewPage />} />
      <Route path="/admin/notice" element={<AdminNoticePage />} />
    </Routes>
  );
};

export default AppRouter;
