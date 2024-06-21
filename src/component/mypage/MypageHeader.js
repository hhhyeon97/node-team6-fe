import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const MypageHeader = () => {

  return(
    <div className='mypage_header'>
      <section className='user_level_info'>
        <div className='user_level_area'>
          <div>회원등급</div>
          <div>GOLD</div>
        </div>
        <div className='user_level_info_area'>
          <FontAwesomeIcon icon={faCircleQuestion} />
          <div>등급정보</div>
          <div>GOLD</div>
        </div>
      </section>

      <section className='title_area'>
        <div>
          <h3>나의 예매</h3>
          <p>예약날짜로 조회</p>
        </div>
      </section>
    </div>
  )
}

export default MypageHeader;