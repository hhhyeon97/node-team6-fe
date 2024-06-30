import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import '../style/css/Navbar.css'
import { faBars, faDoorOpen, faHeart, faMagnifyingGlass, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row } from 'react-bootstrap';
import { likeAction } from '../action/likeAction';
import MobileNavbar from './MobileNavbar';
const Navbar = ({ user }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let categoryIndex = null;
  const { likeQty } = useSelector(state => state.like);
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  const menuList = [
    { name: '뮤지컬', code: 'GGGA' },
    { name: '콘서트', code: 'CCCD' },
    { name: '클래식', code: 'CCCA' },
    { name: '국악', code: 'CCCC' },
    { name: '무용', code: 'BBBC' },
    { name: '연극', code: 'AAAA' },
  ]

  useEffect(()=>{
    if(user) {
      dispatch(likeAction.getLikeList())  
    }
  },[likeQty,user])

  const logout = () => {
    dispatch(userActions.logout());
    dispatch(likeAction.resetLikeList());
    navigate('/')
  };

  const sendCategory = (code) => {
    categoryIndex = menuList.findIndex(menu => menu.code === code);
    let categoryName = menuList.find(menu => menu.code === code);
    setCategory(categoryIndex)
    console.log('categoryName:', categoryName.name)
    navigate(`/performance?category=${code}&categoryName=${categoryName.name}`)
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
    <div className='nav_underline'>
      <Container className='wrap-container nav_area'>
        <Row>
          <Col xs={8} className='nav_logo_area' >
              <a href='/' >
                <img src="/testImage/logo.png" />  
              </a>
          </Col>
          <Col xs={4} className="nav_user_menu nav_icon">
            {user && user.level === 'admin' ? (
              <div onClick={() => navigate('/admin')}>
                <FontAwesomeIcon icon={faUnlock} className='nav_user_icon' /> <span>ADMIN</span>
              </div>) : ''}
            {user ? (
              <div onClick={() => navigate('/mypage')}>
                <FontAwesomeIcon icon={faUser} className='nav_user_icon' /> <span>MY PAGE</span>
              </div>
            ) : (
              <div onClick={() => navigate('/register')}>
                <FontAwesomeIcon icon={faUser} className='nav_user_icon' /> <span>JOIN US</span>
              </div>)}
            {user ? (
              <div onClick={() => navigate('/mypage/like')}>
                <FontAwesomeIcon icon={faHeart} className='nav_user_icon' /> <span>{`LIKE ${likeQty}`}</span>
              </div>
            ) : (
              <div onClick={() => navigate('/login')}>
                <FontAwesomeIcon icon={faHeart} className='nav_user_icon' /> <span>MY LIKE</span>
              </div>
            )}
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
          <Col xs={4} className='mobile_input_area'>
            {isMobile?(
                <form onSubmit={searchByKeyword}>
                  <input
                    type='text'
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    onKeyDown={onCheckEnter}
                  />
                  <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </form>
              ):''}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={9} className='nav_category_area'>
            <ul className='nav_category'>
              {menuList.map((menu, index) => (
                <li key={index}>
                  <button onClick={() => sendCategory(menu.code)} className='nav_category_button'>
                    {menu.name}
                    <div className='hidden_under_bar'></div>
                    {category === index ? (<div className='nav_menu_under_bar'></div>) : ''}
                  </button>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={3} className='nav_input_area'>
            <form onSubmit={searchByKeyword} className='input-box'>
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
      {isMobile?(<MobileNavbar user={user} likeQty={likeQty} logout={logout} className='mobile_show'/>):''}
    </div>
  );
};

export default Navbar;
