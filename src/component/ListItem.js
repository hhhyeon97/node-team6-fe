import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";


const ListItem = () => {

    return (
        <Row className="ListItem" >
            <Col lg={5} md={5} sm={5}>
                <div>title</div>
                <div>기간</div>
                <div>13000</div>
            </Col>
            <Col lg={5} md={6} sm={6} className="image_col">
                <img className="posterImg" src="testImage/test_poster.jpg" alt="포스터 이미지"></img>
            </Col>
        </Row>
    )

}

export default ListItem