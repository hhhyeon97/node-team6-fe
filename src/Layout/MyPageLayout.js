import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import MypageHeader from '../component/mypage/MypageHeader';
import MypageSidebar from "../component/mypage/MypageSidebar";
import MypageUserProfile from "../component/mypage/MypageUserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/css/Mypage.css";

const MyPageLayout = ({ children }) => {
  return (
    <Container>
      <div style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <div class="mypage-top">
          <MypageUserProfile />
          <MypageHeader/>
        </div>
        <MypageSidebar />
        {children}
      </div>
    </Container>
  );
}

export default MyPageLayout;
