import React from "react";
import { reserveFormat } from '../../utils/Date';
import { priceformat } from '../../utils/Date';
import { convertToKST } from '../../utils/Date';

const MyReserveCard = ({ item, onClick }) => {
  return(
    <div className='my_reserve_card_container' onClick={onClick}>
    <div className="card_top">
      <div class="info_group">
        <div className='info_item'><p>예매번호</p>{item.reservationId}</div>
        <div className='info_item'><p>예매일자</p>{convertToKST(item.createdAt)}</div>
      </div>
      <div className='info_item book_date'>
        <p>관람일자</p>
        <strong>{reserveFormat(item.reservationDate)}</strong>
      </div>
    </div>
    <div className="card_main">
      <div className='poster_box'>
        <img
          className='poster_img'
          src={item.ticket.SeqImage}
          style={{ width: '6em' }}
          alt='예약공연 포스터'
          />
      </div>
      <div className='card_title'><h5>{item.ticket.SeqTitle}</h5></div>
      <div><strong>{priceformat(item.totalPrice)}원</strong> / 티켓수량 <strong>{item.ticketNum}</strong></div>
    </div>
  </div>
    
  )
}

export default MyReserveCard;