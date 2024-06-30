import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MypageSidebar = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 480px)").matches);
  useEffect(() => {
    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 480px)").matches);
  };
  console.log('ismobile', isMobile)
  return (
    <div className="mypage_sidebar">
      <ul>
        <h3>나의 예매</h3>
        <ul className="link_menu">
          <li>
            {isMobile ? (
              <Link to="/mypage/reservations/by-date/mobile">관람일자로 조회</Link>
              ):(
              <Link to="/mypage/reservations/by-date">관람일자로 조회</Link>
            )}
          </li>
          <li>
            <Link to="/mypage/reservations/view-all">전체 조회</Link>
          </li>
        </ul>
        <h3>나의 활동</h3>
        <ul className="link_menu">
          <li>
            <Link to="/mypage/reviews">나의 리뷰</Link>
          </li>
          <li>
            <Link to="/mypage/like">나의 찜</Link>
          </li>
        </ul>
        <h3>나의 계정</h3>
        <ul className="link_menu">
          <li>
            <Link to="/mypage/edit-profile">회원정보 수정</Link>
          </li>
          <li>
            <Link to="/mypage/verify-password">비밀번호 변경</Link>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default MypageSidebar;
