import React from "react";

const MyReserveCard = ({ item }) => {
  return(
    <div className='my_reserve_card_container'>
    <h5>예매카드</h5>
    <div>{item.reservationId}</div>
    <div>{item.reservationDate}</div>
    <div className='poster_box'>
      <img 
        className='poster_img'
        src={item.ticket.SeqImage}
        style={{ width: '6em' }}
        alt='예약공연 포스터'
      />
    </div>
  </div>
    
  )
}

export default MyReserveCard;