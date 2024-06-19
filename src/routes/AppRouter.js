import React from "react";
import { Route, Routes } from "react-router";
// import PrivateRoute from "./PrivateRoute";
import ListPage from "../pages/ListPage";

const AppRouter = () => {
    return (
        <Routes>
            {/* <Route path="/" element={< />} /> */}
            <Route path="/performanceList" element={<ListPage />} />
        </Routes>
    );
};

export default AppRouter;