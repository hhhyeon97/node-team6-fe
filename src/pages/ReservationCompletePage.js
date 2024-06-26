import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import JSConfetti from "js-confetti";
import { Col, Container, Row } from "react-bootstrap";
import '../style/css/ReservationCompletePage.css'

const ReservationCompletePage = () => {
    const jsConfetti = new JSConfetti();

    //색종이 커스터마이징
    const handleClick = () => {
        jsConfetti.addConfetti({
            emojis: ["🍔", "🍕", "🍺", "🍗"],
            emojiSize: 100,
            confettiNumber: 30,
        });
    };

    useEffect(() => {
        handleClick()
    }, [])

    const { reservationId } = useSelector(state => state.reservation)

    return (
        <Container className="wrap-container">
            <Row className="completePageBox">
                <Col className="completeTitle">주문이 <br /> 완료되었습니다.</Col>
                <Col className="completeInfo">
                    <Row>
                        예매 번호: {reservationId}
                    </Row>
                    <Row>
                        <a href="/mypage/reservations/view-all?page=1">
                            나의 예매내역으로 바로가기
                        </a>
                    </Row>
                </Col>
            </Row>
        </Container>

    )
}

export default ReservationCompletePage