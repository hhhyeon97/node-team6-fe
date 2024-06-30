import React from "react";
import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Container } from "react-bootstrap";
import MypageUserLevel from '../component/mypage/MypageUserLevel';
import MypageSidebar from "../component/mypage/MypageSidebar";
import { userActions } from '../action/userAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/css/Mypage.css";
import "../style/css/MypageSideBar.css";
import LinedTitle from '../component/LinedTitle';
import UserProfile from '../component/UserProfile';
import "../style/css/MypageMobile.css";

const MyPageLayout = ({ title, cap, children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const isMobile = window.matchMedia("(max-width: 480px)").matches;
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 480px)").matches);
  
  // [ 유저 정보 들고오기 ] 
  // useEffect(()=>{
  //   dispatch(userActions.getUser());
  // },[dispatch, isMobile]);
  
  // // [ user loading ]
  // if (!user) {
  //   return <div>Loading...</div>; // 또는 다른 적절한 로딩 표시
  // }
  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 480px)").matches);
  };

  // [ 유저 정보 들고오기 ] 
  useEffect(() => {
    dispatch(userActions.getUser());

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  // [ user loading ]
  if (!user) {
    return <div>Loading...</div>; // 또는 다른 적절한 로딩 표시
  }

  return (
    <Container className='wrap-container mypage-wrap-container'>
      <div class="mypage_side_bar_container">
        <UserProfile user={user} />
        <MypageUserLevel user={user}/>
        <MypageSidebar />
      </div>
      {isMobile ? (
        <></>
      ):(
        <div className="mypage-container">
        <section className="mypage-right">
          <MypageUserLevel user={user}/>
          <LinedTitle title={title} cap={cap}/>
          <main>
          {children}
          </main>
        </section>
      </div>               
      )}
    </Container>
);
}

export default MyPageLayout;
