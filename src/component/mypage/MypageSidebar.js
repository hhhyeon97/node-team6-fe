import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

const MypageSidebar = () => {

  return(
    <div className='mypage_sidebar'>
      <ul>
      <li>나의 예매</li>
        <ul className='reservation_sub_menu'>
          <li>예약날짜로 조회</li>
          <li>전체 조회</li>
        </ul>
        <li>나의 리뷰</li>
        <li>나의 찜</li>
        <li>회원정보 수정</li>
      </ul>
    </div>
  )
}

export default MypageSidebar;