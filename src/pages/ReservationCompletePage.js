import React from "react";
import { useSelector } from "react-redux";

const ReservationCompletePage = () => {
    const { reservationId } = useSelector(state => state.reservation)

    return (
        <div>
            <div>예매완료 페이지</div>
            <div>예매 번호: {reservationId}</div>
        </div>

    )
}

export default ReservationCompletePage