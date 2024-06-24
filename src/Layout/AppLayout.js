import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Col, Row, Container } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import AdminSidebar from '../component/admin_page/AdminSidebar';
import "../style/css/AdminPage.css";
import logoImg from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const AppLayout = ({ children }) => {
  const location = useLocation(); // 사용자의 현재 url 주소 받아옴
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // [ 토큰으로 로그인하기 ] 
  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  return (
    <div>
      {/* Header & Footer 호출 */}

      {location.pathname.includes("admin") ? (
        <div className="admin_page_container">
          <AdminSidebar />
          <div class="admin_main_container">
            <div className='admin_top_nav'>
              <Link className='go_to_home_btn' to="/" alt='main으로 돌아가기'>
                <img src={logoImg} />
              </Link>
            </div>
            <Container className='wrap-container'>
              <section className="admin_main_section" style={{ border: '1px solid #ccc' }}>
                <main>{children}</main>
              </section>
            </Container>
          </div>
        </div>
      ) : (
        <>
          <Navbar user={user} />
            {children}
          <Footer />
        </>
      )}
    </div>
  );
};

export default AppLayout;
