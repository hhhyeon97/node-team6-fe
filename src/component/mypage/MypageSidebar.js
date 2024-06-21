import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const MypageSidebar = () => {

  return(
    <div className='mypage_sidebar'>
      <ul>
        <h3>나의 예매정보</h3>
          <ul className='link_menu'>
            <li><Link to="/mypage/reservations/by-date">예약날짜로 조회</Link></li>
            <li><Link to="/mypage/reservations/view-all">전체 조회</Link></li>
          </ul>
        <h3>나의 활동정보</h3>
          <ul className='link_menu'>
          <li><Link to="/mypage/reviews">나의 리뷰</Link></li>
          <li><Link to="/mypage/reviews">나의 찜</Link></li>
          </ul>
        <h3>나의 계정설정</h3>
          <ul className='link_menu'>
            <li><Link to="/mypage/edit-profile">회원정보 수정</Link></li>
          </ul>
      </ul>
    </div>
  )
}

export default MypageSidebar;