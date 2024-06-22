import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Container } from "react-bootstrap";
import MypageUserLevel from '../component/mypage/MypageUserLevel';
import MypageSidebar from "../component/mypage/MypageSidebar";
import MypageUserProfile from "../component/mypage/MypageUserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/css/Mypage.css";
import LinedTitle from '../component/LinedTitle';

const MyPageLayout = ({ title, cap, children }) => {
  // const { user } = useSelector((state) => state.user);
  // console.log('user', user)

  return (
    <Container className='wrap-container'>
      <div className="mypage-container"style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc' }}>
        <section className="mypage-left">
          <MypageUserProfile />
          <MypageSidebar />
        </section>
        <section className="mypage-right">
          <MypageUserLevel/>
          <LinedTitle title={title} cap={cap}/>
          <main>
          {children}
          </main>
        </section>
      </div>
    </Container>
  );
}

export default MyPageLayout;
