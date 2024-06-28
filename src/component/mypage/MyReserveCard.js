import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { reviewAction } from '../../action/reviewAction';
import { Button } from "react-bootstrap";
import { reserveFormat } from '../../utils/Date';
import { priceformat } from '../../utils/Date';
import { convertToKST } from '../../utils/Date';
import { Alert } from "react-bootstrap";

const MyReserveCard = ({ item,  openReviewForm, isReviewed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let canceled = '';

  // console.log("리뷰됬나요", item.ticket.SeqTitle, ":", isReviewed)

	// [ 리뷰를 남긴 예매인지 체크하기 ]
	// useEffect(() => {
	// 	dispatch(reviewAction.checkReviewed(item._id));
	// }, [item._id, dispatch]);

  // console.log('reviewed?',reviewedReserve._id )
  // console.log("여기서 찍자", isReviewed)

  // console.log("item._id", item._id, ": isReviewed_id", isReviewed)

  // [ 포스터를 누르면 해당 공연 디테일 페이지로 이동 ]
  const handlePosterClick = (event) => {
    event.stopPropagation(); // 클릭 이벤트의 전파를 막음
    navigate(`/performance/${item.ticket.SeqId}`);
  };

  // [ 예매취소된 예매일 경우 연하게 보이게 ]
  if(item.isCanceled){
    canceled ='canceled';
  }

  // [ 리뷰쓰기 버튼 클릭 처리 ]
  const handleReviewButtonClick = (event) => {
    event.stopPropagation(); // 클릭 이벤트의 전파를 막음
    openReviewForm(item); // 리뷰쓰기 폼 열기
  };

  return(
    <div className={`${canceled} my_reserve_card_container`}
    onClick={() => navigate(`/mypage/reservations/${item._id}`)}>
    <div className="card_top">
      <div class="info_group">
        <div className='info_item'><p>예매번호</p><strong>{item.reservationId}</strong></div>
        <div className='info_item'><p>예매일자</p><strong>{convertToKST(item.createdAt)}</strong></div>
      </div>
      <div className='info_item book_date'>
        <p>관람일자</p>
        <strong>{reserveFormat(item.reservationDate)}</strong>
      </div>
    </div>
    <div className="card_main">
      <div className='card_title'>
          <div className='poster_box' onClick={handlePosterClick} >
            <img
              className='poster_img'
              src={item.ticket.SeqImage}
              style={{ width: '6em' }}
              alt='예약공연 포스터'
              />
          </div>
          <h5>{item.ticket.SeqTitle}</h5>
        </div>
      <div className='item_price'>
        <strong>{priceformat(item.totalPrice)}원 /</strong>
        <strong>수량 {item.ticketNum}</strong>
      </div>
      {item.isCanceled ? (<div className='canceled_reserve'>예매취소됨</div>):(<div className='transparent canceled_reserve'>예매취소됨</div>)}
      {!item.ticket.isReview && !item.isCanceled ? (
        <Button variant='dark' size="sm" className='review_btn' onClick={handleReviewButtonClick}>
          리뷰작성
        </Button>
      ) : (
        <Button variant='light' size="sm" className='review_btn transparent disabled'>
          리뷰안돼
        </Button>
      )}
      </div>
  </div>
    
  )
}

export default MyReserveCard;