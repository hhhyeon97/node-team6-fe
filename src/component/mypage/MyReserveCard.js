import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { reviewAction } from '../../action/reviewAction';
import { reservationAction } from '../../action/reservationAction';
import { Button } from "react-bootstrap";
import { reserveFormat } from '../../utils/Date';
import { priceformat } from '../../utils/Date';
import { convertToKST } from '../../utils/Date';
import AlertModal from '../AlertModal';
import "../../style/css/MypageMobile.css"

const MyReserveCard = ({ item,  openReviewForm, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let canceled = '';
  const [showModal, setShowModal] = useState(false);
  const [cancelBtnClass, setCancelBtnClass] = useState('');
  const [canWriteReview, setCanWriteReview] = useState(false); // 추가된 상태

  // [ 포스터를 누르면 해당 공연 디테일 페이지로 이동 ]
  const handlePosterClick = (event) => {
    event.stopPropagation(); // 클릭 이벤트의 전파를 막음
    navigate(`/performance/${item?.ticket?.SeqId}`);
  };

  // [ 카드 클릭 시 이동 ]
  const handleCardClick = (event) => {
    event.stopPropagation(); // 클릭 이벤트의 전파를 막음
    navigate(`/mypage/reservations/${item._id}`);
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

  // [ 관람 당일 이후거나 이미 예매취소했으면 예매취소 불가능 ]
  useEffect(() => {
    const reservationDate = new Date(item?.reservationDate);
    const currentDate = new Date();

    if (reservationDate > currentDate && !item.isCanceled) {
      setCancelBtnClass('okCancel');
    } else {
      setCancelBtnClass('disableCancel');
    }

    // 관람일자 당일 이후에만 리뷰쓰기 버튼 활성화
    if (reservationDate <= currentDate && !item.isCanceled) {
      setCanWriteReview(true);
    } else {
      setCanWriteReview(false);
    }
  }, [item]);

  // [ 예매 취소 ]
  const handleCancle = (event) => {
    event.stopPropagation();
    console.log("취소")
    setShowModal(true);
  }

  return(
    <div className={`${canceled} my_reserve_card_container my_reserve_card_container_mobile`}
    onClick={handleCardClick}>
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
      {!isMobile ? (
        <>
          <div className='card_title'>
              <div className='poster_box' onClick={handlePosterClick} >
                <img
                  className='poster_img'
                  src={item?.ticket?.SeqImage}
                  alt='예약공연 포스터'
                  />
              </div>
              <h5>{item?.ticket?.SeqTitle}</h5>
            </div>
          <div className='item_price'>
            <strong>{priceformat(item.totalPrice)}원 /</strong>
            <strong>수량 {item?.ticketNum}</strong>
          </div>
        </>
      ):(
        <>
        <div className='card_title'>
            <div className='poster_box' onClick={handlePosterClick} >
              <img
                className='poster_img'
                src={item?.ticket?.SeqImage}
                alt='예약공연 포스터'
                />
            </div>
          <div class="reserve_card-info_group">
            <h5>{item?.ticket?.SeqTitle}</h5>
            <div className='item_price' id='item_price'>
              <strong>{priceformat(item.totalPrice)}원 /</strong>
              <strong>수량 {item?.ticketNum}</strong>
            </div>
          </div>
        </div>
      </>
      )}

      <div class="card_btns">
        {item.isCanceled ? (<div className='canceled_reserve'>예매취소됨</div>):(<Button variant='light' onClick={handleCancle} className={cancelBtnClass}>예매취소</Button>)}
        {canWriteReview && !item?.ticket?.isReview && !item.isCanceled ? (
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
      <AlertModal 
        showModal={showModal}
        setShowModal={setShowModal}
        selectedId={item._id}
        selectedName={item.ticket.SeqTitle}
        selectedDate={reserveFormat(item.reservationDate)}
        alertMessage="해당 공연의 예매를 정말로 취소하시겠습니까?(예매취소는 관람일 하루 전날까지만 가능합니다)"
        btnText="예매취소"
      />
  </div>
    
  )
}

export default MyReserveCard;