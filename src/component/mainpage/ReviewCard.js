import React from 'react'
import Star from '../Star'

const ReviewCard = ({item}) => {
    const cutReviewText = (text) => {
        const maxLength = 70;
        const cutText = text.length > maxLength? text.substring(0,maxLength) + '...' : text;
        return cutText
    }

  return (
    <div className='review_card_area'>
      <div className='review_card_img_box'>
        <img src={item.image} className='review_card_img'/>
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
