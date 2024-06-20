import React from 'react';
import { Route, Routes } from 'react-router';
// import PrivateRoute from "./PrivateRoute";
import ListPage from '../pages/ListPage';
import RegisterPage from '../pages/RegisterPage';
import PerformanceDetail from '../pages/PerformanceDetail';

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={< />} /> */}
      <Route path="/performance" element={<ListPage />} />
      <Route path="/performance/:id" element={<PerformanceDetail />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;
