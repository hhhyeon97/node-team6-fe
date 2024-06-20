import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";


const ListItem = ({ item }) => {
    const navigate = useNavigate();
    const showPerformance = (id) => {
        navigate(`/performance/${id}`)
    }

    return (
        <Row className="ListItem" onClick={() => showPerformance(item.mt20id)}>
            <Col lg={5} md={6} sm={6} className="image_col">
                <img className="posterImg" src={item.poster} alt="포스터 이미지"></img>
            </Col>
            <Col lg={5} md={5} sm={5} className="item_info_box">
                <div>{item.fcltynm}</div>
                <div>기간: {item.prfpdfrom} ~ {item.prfpdto}</div>
                <div>공연 상태: {item.prfstate}</div>
            </Col>
        </Row>
    )

}

export default ListItem