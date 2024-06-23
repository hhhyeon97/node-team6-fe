import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ReservationPage = () => {
    const { detailData } = useSelector(state => state.list)
    console.log('reservation page detailData:', detailData)

    return (
        <Container>
            <h3>예약페이지 입니다!</h3>
        </Container>
    );
};

export default ReservationPage;
