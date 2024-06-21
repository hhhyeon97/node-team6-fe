import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';

const AppLayout = ({ children }) => {
  const location = useLocation(); // 사용자의 현재 url 주소 받아옴
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  return (
    <div>
      {/* Header & Footer 호출 */}
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default AppLayout;
