import React from "react";
import { Col, Row } from "react-bootstrap";


const MyPageLayout = ({ children }) => {
    return (
        <div>
            <div className="my_page_layout">
                <Row>
                    <Col md={3}>
                    </Col>
                    <Col md={9}>
                        <main>
                          <div>my_page_layout</div>
                            {children}
                        </main>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default MyPageLayout;
