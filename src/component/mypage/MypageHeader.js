import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const MypageHeader = () => {

  return(
    <div className='mypage_header'>
      <section className='user_level_section'>
        <div className='user_level_info'>
          <h5>회원등급</h5>
          <div>GOLD</div>
        </div>
        <div className='vertical_bar'>&#124;</div>
        <div className='user_level_info'>
          <FontAwesomeIcon icon={faCircleQuestion} />
          <h5>등급정보</h5>
          <div>회원님은 티켓 예매시 10%의 할인혜택을 받으실 수 있습니다</div>
        </div>
      </section>

      <section className='mypage_title_section'>
        <div className='mypage_title'>
          <h3>나의 예매</h3>
          <p>예약날짜로 조회</p>
        </div>
      </section>
    </div>
  )
}

export default MypageHeader;