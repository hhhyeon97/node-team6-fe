import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import { useDispatch } from 'react-redux';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import '../style/Navbar.css';
import { Container } from 'react-bootstrap';
const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logout = () => {
    dispatch(userActions.logout());
  };

  return (
    <Container className="wrap-container">
      <div className="nav_area">
        <div className="nav_logo_area">
          <a href="/">
            <img src="/testImage/logo.png" />
          </a>
        </div>
        <div className="nav_menu">
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
      </div>
    </Container>
  );
};

export default Navbar;
