import React from 'react';
import { Route, Routes } from 'react-router';
// import PrivateRoute from "./PrivateRoute";
import ListPage from '../pages/ListPage';
import RegisterPage from '../pages/RegisterPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={< />} /> */}
      <Route path="/performanceList" element={<ListPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;
