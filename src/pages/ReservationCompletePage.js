import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import JSConfetti from "js-confetti";
import { Col, Container, Row } from "react-bootstrap";
import '../style/css/ReservationCompletePage.css'
import { useNavigate } from "react-router-dom";

const ReservationCompletePage = () => {
    const navigate = useNavigate()
    const jsConfetti = new JSConfetti();

    //색종이 커스터마이징
    const handleClick = () => {
        jsConfetti.addConfetti({
            // emojis: ["🍔", "🍕", "🍺", "🍗"],
            // emojis: ["N", "O", "C", "N", "A"],
            emojis: ["💸", "🪙", "💲", "👍", "💖"],
            emojiSize: 80,
            confettiNumber: 50,
        });
    };

    useEffect(() => {
        handleClick()
    }, [])

    const { reservationId } = useSelector(state => state.reservation)

    const moveMyReservation = () => {
        navigate('/mypage/reservations/view-all?page=1')
    }

    return (
        <Container className="wrap-container">
            <Row className="completePageBox">
                <Col lg={6} md={7} sm={12} className="completeTitle">예매가 <br /> 완료되었습니다.</Col>
                <Col lg={6} md={5} sm={12} className="completeInfo">
                    <Row>
                        예매 번호: {reservationId}
                    </Row>
                    <Row onClick={moveMyReservation} className="moveLink">
                        나의 예매내역으로 바로가기
                    </Row>
                </Col>
            </Row>
        </Container>

    )
}

export default ReservationCompletePage