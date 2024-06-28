import React from "react";
import { convertToKST } from '../utils/Date'
import { Col, Row } from "react-bootstrap";

const ReservationItem = ({ item }) => {
    return (
        <div className="ByDateReservationItem">
            <Row className="top_Info">
                <Col lg={9} md={9} sm={9} className="top_Info_left">
                    <div>예매번호 <span>{item.reservationId}</span></div>
                    <div>예매한 날짜 <span>{convertToKST(item.createdAt)}</span></div>
                </Col>
                <Col lg={3} md={3} sm={3} className="top_Info_right">
                    <div>관람날짜 <span>{convertToKST(item.reservationDate)}</span></div>
                </Col>
            </Row>
            <Row className="bottom_Info">
                <Col className="poster_img" lg={3} md={3} sm={3} style={{ backgroundImage: `url(${item.ticket.SeqImage})` }}>
                    {/* <img className="poster_img" src={`${item.ticket.SeqImage}`}></img> */}
                </Col>
                <Col lg={8} md={8} sm={8}>
                    <div className="item_title">{item.ticket.SeqTitle}</div>
                    <div className="item_cost">
                        <div>{item.totalPrice}원</div>
                        <div>&nbsp;/&nbsp;</div>
                        <div><span>티켓수량</span> {item.ticketNum}</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ReservationItem