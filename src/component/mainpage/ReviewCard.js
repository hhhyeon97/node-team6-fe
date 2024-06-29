import React from 'react'
import Star from '../Star'
import { useNavigate } from 'react-router-dom'

const ReviewCard = ({item}) => {
  const navigate = useNavigate();
    const cutReviewText = (text) => {
        const maxLength = 70;
        const cutText = text.length > maxLength? text.substring(0,maxLength) + '...' : text;
        return cutText
    }

  return (
    <div className='review_card_area' onClick={()=>navigate(`/performance/${item.reservationId.ticket.SeqId}`)}>
      <div className='review_card_img_box'>
        <img src={item.reservationId.ticket.SeqImage} className='review_card_img'/>
      </div>
      <div className='review_card_text_box'>
        <div className='review_card_text'>
            <h3>{item.reservationId.ticket.SeqTitle}</h3>
            <Star startNum={item.starRate} />
            <p>{cutReviewText(item.reviewText)}</p>
        </div>
        <div className='review_card_user_box'>
            <div className='review_card_user_img_box'><img src={item.userId.image}/></div>
            <span>{item.userId.name}</span>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
