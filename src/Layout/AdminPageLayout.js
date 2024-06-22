import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import AdminSidebar from '../component/admin_page/AdminSidebar';
import "../style/css/AdminPage.css";

const AdminPageLayout = ({ children }) => {

  return (
    <div className="admin_page_container">
      <AdminSidebar />
      <Container className='wrap-container'>
        <section className="admin_main_section" style={{ border: '1px solid #ccc' }}>
          <main>{children}</main>
        </section>
      </Container>
    </div>
  );
}

export default AdminPageLayout;