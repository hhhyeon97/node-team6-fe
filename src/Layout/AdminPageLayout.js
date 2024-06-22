import React from "react";
import { Col, Row, Container } from "react-bootstrap";

const AdminPageLayout = ({ children }) => {

  return (
    <Container className='wrap-container'>
      <div className="admin-page-container" style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc' }}>
        <h1>admin page</h1>
        <main>{children}</main>
      </div>
    </Container>
  );
}

export default AdminPageLayout;