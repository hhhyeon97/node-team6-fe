import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import { useDispatch } from 'react-redux';
// import '../style/Navbar2.css';
import '../style/css/Navbar.css'
import { faDoorOpen, faHeart, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row } from 'react-bootstrap';
const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const menuList = [
    '뮤지컬',
    '콘서트',
    '클래식',
    '국악',
    '무용',
    '연극'
  ]

  const logout = () => {
    dispatch(userActions.logout());
  };

  return (
    <Container className='wrap-container nav_area'>
      <Row>
         <Col className='nav_logo_area'>
          <a href="/">
            <img src="/testImage/logo.png" />
          </a>
        </Col>
        <Col className="nav_user_menu nav_icon">
          {user && user.level ? (
            <div onClick={()=>navigate('/admin')}>
              <FontAwesomeIcon icon={faUnlock} className='nav_user_icon'/>ADMIN
            </div>):''}
          {user?(
            <div onClick={()=>navigate('/mypage')}>
              <FontAwesomeIcon icon={faUser} className='nav_user_icon'/> MY PAGE
            </div>
          ):(
            <div onClick={()=>navigate('/register')}>
              <FontAwesomeIcon icon={faUser} className='nav_user_icon'/> JOIN US
            </div>)}
          
          <div><FontAwesomeIcon icon={faHeart} className='nav_user_icon'/> {user?'':'MY LIKE'}</div>
          {user ? (
              <div onClick={logout}>
                <FontAwesomeIcon icon={faDoorOpen} className='nav_user_icon'/>
                <span>LOGOUT</span>
              </div>
            ) : (
              <div onClick={() => navigate('/login')}>
                <FontAwesomeIcon icon={faDoorOpen} className='nav_user_icon'/>
                <span>LOGIN</span>
              </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='nav_category_area'>
          <ul className='nav_category'>
              {menuList.map((menu,index)=>(
                <li key={index}>
                  <button>
                    {menu}
                  </button>
                </li>
              ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
