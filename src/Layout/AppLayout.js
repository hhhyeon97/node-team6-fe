import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Col, Row, Container } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import AdminSidebar from '../component/admin_page/AdminSidebar';
import "../style/css/AdminPage.css";

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

      {location.pathname.includes("admin") ? (
        <div className="admin_page_container">
          <AdminSidebar />
          <Container className='wrap-container'>
            <section className="admin_main_section" style={{ border: '1px solid #ccc' }}>
              <main>{children}</main>
            </section>
          </Container>
        </div>
      ) : (
        <>
          <Navbar user={user} />
          {children}
        </>
      )}
    </div>
  );
};

export default AppLayout;
