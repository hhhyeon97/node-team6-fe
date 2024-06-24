import React from "react";
import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Container } from "react-bootstrap";
import MypageUserLevel from '../component/mypage/MypageUserLevel';
import MypageSidebar from "../component/mypage/MypageSidebar";
import { userActions } from '../action/userAction';
// import MypageUserProfile from "../component/mypage/MypageUserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/css/Mypage.css";
import LinedTitle from '../component/LinedTitle';
import UserProfile from '../component/UserProfile';

const MyPageLayout = ({ title, cap, children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  
  // [ 유저 정보 들고오기 ] 
  useEffect(()=>{
    dispatch(userActions.getUser());
  },[dispatch]);
  
  // [ user loading ]
  if (!user) {
    return <div>Loading...</div>; // 또는 다른 적절한 로딩 표시
  }

  return (
    <Container className='wrap-container'>
      <div className="mypage-container"style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc' }}>
        <section className="mypage-left">
          {/* <MypageUserProfile /> */}
          <UserProfile user={user} />
          <MypageSidebar />
        </section>
        <section className="mypage-right">
          <MypageUserLevel user={user}/>
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
