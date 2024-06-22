import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const MypageUserProfile = () => {

  return(
    <div className='mypage_user_profile'>
      <div class="user_profile">
        <div className="user_img">
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
        <div className='user_name'>김제비</div>
      </div>
    </div>
  )
}

export default MypageUserProfile;