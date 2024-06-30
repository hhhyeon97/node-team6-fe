import React from "react";
import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Container } from "react-bootstrap";
// import MypageUserLevel from '../component/mypage/MypageUserLevel';
// import MypageSidebar from "../component/mypage/MypageSidebar";
// import { userActions } from '../action/userAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "../style/css/Mypage.css";
// import "../style/css/MypageSideBar.css";
// import LinedTitle from '../component/LinedTitle';
// import UserProfile from '../component/UserProfile';

const MyPageMobile = ({ title, cap, children }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);
  
  // // [ 유저 정보 들고오기 ] 
  // useEffect(()=>{
  //   dispatch(userActions.getUser());
  // },[dispatch]);
  
  // // [ user loading ]
  // if (!user) {
  //   return <div>Loading...</div>; // 또는 다른 적절한 로딩 표시
  // }

  return (
    <>
    <Container className='wrap-container mypage-wrap-container'>
      <h1>모바일</h1>
      {/* <div class="mypage_side_bar_container">
        <UserProfile user={user} />
        <MypageSidebar />
      </div>
      <div className="mypage-container">
        <section className="mypage-right">
          <MypageUserLevel user={user}/>
          <LinedTitle title={title} cap={cap}/>
          <main>
          {children}
          </main>
        </section>
      </div> */}
    </Container>
    </>
  );
}

export default MyPageMobile;
