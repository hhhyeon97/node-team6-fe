import React from "react";
import { Col, Row, Container } from "react-bootstrap";


const MyPageLayout = ({ children }) => {
    return (
        <Container>
            <div style={{ marginTop: '20px', marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <div>MyPageLayout 내용이 화면에 잘 나타납니다.</div>
                {children}
            </div>
        </Container>
    );
}

export default MyPageLayout;
