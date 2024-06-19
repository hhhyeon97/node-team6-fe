import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Navbar from "../component/Navbar";
import { useDispatch, useSelector } from "react-redux";

const AppLayout = ({ children }) => {
    const location = useLocation();     // 사용자의 현재 url 주소 받아옴
    const dispatch = useDispatch();

    return (
        <div>
            {/* Header & Footer 호출 */}
            {children}
        </div>
    )
}

export default AppLayout;