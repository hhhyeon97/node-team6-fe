import React from "react";
import { convertToKST } from '../utils/Date'

const ReservationItem = ({ item }) => {
    return (
        <div className="ByDateReservationItem my_reserve_card_container">
            <div>{item.ticket.SeqTitle}</div>
            <div>{convertToKST(item.reservationDate)}</div>
            <div>{item.SeqLocation}</div>
            <div>{item.ticketNum}개</div>
            <div>{item.totalPrice}원</div>
            <div>예매번호 {item.reservationId}</div>
        </div>
    )
}

export default ReservationItem