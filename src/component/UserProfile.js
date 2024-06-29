import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultProfile from '../assets/img/profile_user.png';

const UserProfile = ({ user }) => {

  return(
    <div className='user_profile_container'>
      <div class="user_profile">
        <div className="user_img">
          {/* 토큰으로 user정보 가져오는거 되면 수정 */}
          {user?.image ? (
            <img 
              src={user?.image}
              alt={user?.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              onError={(e) => e.target.src = defaultProfile}
            />
          ) : (
            <img 
              src={defaultProfile}
              alt={user?.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          )}
        </div>
        <div className='user_name'>{user?.name}</div>
      </div>
    </div>
  )
}

export default UserProfile;