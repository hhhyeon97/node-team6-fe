import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import { useDispatch } from 'react-redux';
import '../style/css/Navbar.css'
import { faDoorOpen, faHeart, faMagnifyingGlass, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row } from 'react-bootstrap';
const Navbar = ({ user }) => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const menuList = [
    { name: '뮤지컬', code: 'GGGA' },
    { name: '콘서트', code: 'CCCD' },
    { name: '클래식', code: 'CCCA' },
    { name: '국악', code: 'CCCC' },
    { name: '무용', code: 'BBBC' },
    { name: '연극', code: 'AAAA' },
  ]

  const logout = () => {
    dispatch(userActions.logout());
  };

  const sendCategory = (code) => {
    navigate(`/performance?category=${code}`

    )
  }

  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/search?keyword=${keyword}`)
    setKeyword('')
  }

  const onCheckEnter = (event) => {
    if (event.key === 'Enter') searchByKeyword(event);
  }

  return (
    <Container className='wrap-container nav_area'>
      <Row>
        <Col className='nav_logo_area'>
          <a href="/">
            <img src="/testImage/logo.png" />
          </a>
        </Col>
        <Col className="nav_user_menu nav_icon">
          {user && user.level === 'admin' ? (
            <div onClick={() => navigate('/admin')}>
              <FontAwesomeIcon icon={faUnlock} className='nav_user_icon' /> ADMIN
            </div>) : ''}
          {user ? (
            <div onClick={() => navigate('/mypage')}>
              <FontAwesomeIcon icon={faUser} className='nav_user_icon' /> MY PAGE
            </div>
          ) : (
            <div onClick={() => navigate('/register')}>
              <FontAwesomeIcon icon={faUser} className='nav_user_icon' /> JOIN US
            </div>)}

          <div><FontAwesomeIcon icon={faHeart} className='nav_user_icon' /> {user ? '' : 'MY LIKE'}</div>
          {user ? (
            <div onClick={logout}>
              <FontAwesomeIcon icon={faDoorOpen} className='nav_user_icon' />
              <span>LOGOUT</span>
            </div>
          ) : (
            <div onClick={() => navigate('/login')}>
              <FontAwesomeIcon icon={faDoorOpen} className='nav_user_icon' />
              <span>LOGIN</span>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='nav_category_area'>
          <ul className='nav_category'>
            {menuList.map((menu, index) => (
              <li key={index}>
                <button onClick={() => sendCategory(menu.code)}>
                  {menu.name}
                </button>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={4} className='nav_input_area'>
          <form onSubmit={searchByKeyword}>
            <input
              type='text'
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={onCheckEnter}
            />
            <button type='submit'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
