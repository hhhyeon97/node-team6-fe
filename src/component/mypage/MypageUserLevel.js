import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const MypageUserLevel = ({ user }) => {
  let levelClass = '';
  let benefitText = '';

  // [ level에 따라 className 및 혜택 문구 다르게 ]
  switch (user.level.toUpperCase()) {
    case 'NORMAL':
      levelClass = 'normal level_bdg';
      benefitText = '회원님은 NORMAL 등급입니다. GOLD 회원일 경우 10%의 할인혜택을 받으실 수 있습니다.';
      break;
    case 'GOLD':
      levelClass = 'gold level_bdg';
      benefitText = '회원님은 티켓 예매시 10%의 할인혜택을 받으실 수 있습니다.';
      break;
    case 'SUSPEND':
      levelClass = 'suspend level_bdg';
      benefitText = '회원님의 계정은 현재 정지 상태입니다. 자세한 사항은 1:1 문의를 이용바랍니다.';
      break;
    case 'ADMIN':
      levelClass = 'admin level_bdg';
      benefitText = '관리자 계정입니다. 관리자 페이지에서 홈페이지를 관리해보세요.';
      break;
    default:
      levelClass = '';
      benefitText = '';
  }

  return(
    <div className='user_level_section'>
        <div className='user_level_info'>
          <h5>회원등급</h5>
          <div className={levelClass}>
            {user.level.toUpperCase()}
          </div>
        </div>
        <div className='vertical_bar'>&#124;</div>
        <div className='user_level_info'>
          <FontAwesomeIcon icon={faCircleQuestion} />
          <h5>등급정보</h5>
          <div>{benefitText}</div>
        </div>
    </div>
  )
}

export default MypageUserLevel;