import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
              style={{ width: '75px', height: '75px', objectFit: 'cover' }} 
              onError={(e) => e.target.src = 'https://iconspng.com/_next/image?url=https%3A%2F%2Ficonspng.com%2Fimages%2Fabstract-user-icon-3%2Fabstract-user-icon-3.jpg&w=1080&q=75'}
            />
          ) : (
            <img 
              src='https://iconspng.com/_next/image?url=https%3A%2F%2Ficonspng.com%2Fimages%2Fabstract-user-icon-3%2Fabstract-user-icon-3.jpg&w=1080&q=75'
              alt={user?.name} 
              style={{ width: '75px', height: '75px', objectFit: 'cover' }} 
            />
          )}
        </div>
        <div className='user_name'>{user?.name}</div>
      </div>
    </div>
  )
}

export default UserProfile;