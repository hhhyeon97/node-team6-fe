import { faBars, faDoorOpen, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import '../style/css/MobileNavbar.css'
import MobileCategory from './MobileCategory';

const MobileNavbar = ({user, likeQty, logout}) => {
    const navigate = useNavigate();
    const [showCategory, setShowCategory] = useState(0);

  return (
  <div className='mobile_nav_area'>
    <div className='mobile_under_nav_area'>
        <div onClick={()=>setShowCategory(272)}><FontAwesomeIcon icon={faBars} className='nav_user_icon' /><h6>CATEGORY</h6></div>

        <div>{user ? (
        <div onClick={() => navigate('/mypage/like')}>
          <FontAwesomeIcon icon={faHeart} className='nav_user_icon' /><h6>{`LIKE ${likeQty}`}</h6>
        </div>
      ) : (
        <div onClick={() => navigate('/login')}>
          <FontAwesomeIcon icon={faHeart} className='nav_user_icon' /><h6>MY LIKE</h6>
        </div>
      )}</div>

        <div>{user ? (
        <div onClick={() => navigate('/mypage')}>
          <FontAwesomeIcon icon={faUser} className='nav_user_icon' /><h6>MY PAGE</h6>
        </div>
      ) : (
        <div onClick={() => navigate('/register')}>
          <FontAwesomeIcon icon={faUser} className='nav_user_icon' /><h6>JOIN US</h6>
        </div>)}</div>

        <div>{user ? (
        <div onClick={logout}>
          <FontAwesomeIcon icon={faDoorOpen} className='nav_user_icon' />
          <h6>LOGOUT</h6>
        </div>
      ) : (
        <div onClick={() => navigate('/login')}>
          <FontAwesomeIcon icon={faDoorOpen} className='nav_user_icon' />
          <h6>LOGIN</h6>
        </div>
      )}</div>
    </div>
    <MobileCategory showCategory={showCategory} setShowCategory={setShowCategory}/>
  </div>
    
  )
}

export default MobileNavbar
