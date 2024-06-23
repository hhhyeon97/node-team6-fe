import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";


const ListItem = ({ item }) => {
    const navigate = useNavigate();
    const showPerformance = (id) => {
        navigate(`/performance/${id}`)
    }

    const getStatusClassName = () => {
        if (item.prfstate === '공연중') {
            return 'status_run';
        } else if (item.prfstate === '공연예정') {
            return 'status_yet';
        } else if (item.prfstate === '공연완료') {
            return 'status_over';
        }
        // 기본적으로 반환할 클래스가 없는 경우
        return '';
    };

    return (
        <Row className="ListItem" onClick={() => showPerformance(item.mt20id)}>
            <Col lg={5} md={6} sm={6} className="image_col">
                <img className="posterImg" src={item.poster} alt="포스터 이미지"></img>
            </Col>
            <Col lg={5} md={5} sm={5} className="item_info_box">
                <div>{item.prfnm}</div>
                <div>기간: {item.prfpdfrom} ~ {item.prfpdto}</div>
                <div className={`state ${getStatusClassName()}`}>{item.prfstate}</div>
            </Col>
        </Row>
    )

}

export default ListItem