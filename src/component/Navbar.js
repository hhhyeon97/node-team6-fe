import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import { useDispatch } from 'react-redux';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import '../style/Navbar.css';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
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
    <div className="nav_area">
      <div className="nav_logo_area">
        <a href="/">
          <img src="/testImage/logo.png" />
        </a>
      </div>
      <div className="nav_menu">
        <div><FontAwesomeIcon icon={faUser} /> {user?'MY PAGE':'JOIN US'}</div>
        <div><FontAwesomeIcon icon={faHeart} /> {user?'':'MY LIKE'}</div>
        {user ? (
          <div onClick={logout} className="nav_icon">
            <FontAwesomeIcon icon={faCircleUser} />
            <span>LOGOUT</span>
          </div>
        ) : (
          <div onClick={() => navigate('/login')} className="nav_icon">
            <FontAwesomeIcon icon={faCircleUser} />
            <span>LOGIN</span>
          </div>
        )}
      </div>
      <div>
        <ul className='nav_category'>
          {menuList.map((menu,index)=>(
            <li key={index}>
              <button>
                {menu}
              </button>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
