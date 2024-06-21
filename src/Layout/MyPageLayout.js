import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import MypageHeader from '../component/mypage/MypageHeader';
import MypageSidebar from "../component/mypage/MypageSidebar";
import MypageUserProfile from "../component/mypage/MypageUserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/css/Mypage.css";

const MyPageLayout = ({ children }) => {
  return (
    <Container className='wrap-container'>
      <div className="mypage-container"style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc' }}>
        <section className="mypage-left">
          <MypageUserProfile />
          <MypageSidebar />
        </section>
        <section className="mypage-right">
          <MypageHeader/>
          <main>
          {children}
          </main>
        </section>
      </div>
    </Container>
  );
}

export default MyPageLayout;
