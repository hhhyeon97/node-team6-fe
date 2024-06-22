import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {

  return(
    <div className='user_profile_container'>
      <div class="user_profile">
        <div className="user_img">
          {/* 토큰으로 user정보 가져오는거 되면 수정 */}
          <FontAwesomeIcon icon={faCircleUser} /> 
        </div>
        <div className='user_name'>김제비</div>
      </div>
    </div>
  )
}

export default UserProfile;