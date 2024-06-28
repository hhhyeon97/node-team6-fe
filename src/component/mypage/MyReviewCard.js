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
import Star from '../../component/Star';
import AlertModal from '../AlertModal';
import defaultPhoto from "../../assets/img/default_photo.png"

const MyReviewCard = ({ review,  openReviewForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  let canceled = '';

  // // [ 포스터를 누르면 해당 공연 디테일 페이지로 이동 ]
  // const handlePosterClick = (event) => {
  //   event.stopPropagation(); // 클릭 이벤트의 전파를 막음
  //   navigate(`/performance/${item.ticket.SeqId}`);
  // };

  // // [ 예매취소된 예매일 경우 연하게 보이게 ]
  // if(item.isCanceled){
  //   canceled ='canceled';
  // }

  // [ 리뷰쓰기 버튼 클릭 처리 ]
  const handleEditReview = (event) => {
    event.stopPropagation(); // 클릭 이벤트의 전파를 막음
    openReviewForm(review); // 리뷰쓰기 폼 열기
  };

  // [ 리뷰 삭제 버튼 ]
  const handleEeleteReview = (event) => {
    setShowModal(true);
  }

  // [ 이미지 깨질때 ]
	const handleImageError = (event) => {
    event.target.style.display = 'none';
  };


  return(
    <>
    {!review?.isSuspended ? (
      <div className='my_review_card'>
          <div class="card_main">
            <div class="card_top">
              <div>{review.SeqTitle}</div>
              <div class="top_info">
                <Star startNum={review?.starRate} />
              </div>
            <div>{review.reviewText}</div>
            </div> 
            <div className='poster_box' >
              {review.image ? (
                <img
                className='poster_img'
                src={review?.image}
                style={{ width: '6em' }}
                alt='리뷰사진'
                onError={(e) => e.target.src = defaultPhoto }
                />
                ):(
                  <></>
                  )}
            </div>
          </div>
          <div>{convertToKST(review.createdAt)}</div>
          <div class="review_btns">
            <Button variant="light" onClick={handleEditReview}>수정</Button>
            <Button variant="light" onClick={handleEeleteReview}>삭제</Button>
          </div> 
        </div>
      ):(
        <div className='my_review_card disabled'>
        <div>부적절한 내용으로 숨김처리됨 리뷰입니다. 자세한 사항은 1:1문의를 이용해주세요</div>
        <div class="card_main">
            <div class="card_top">
              <div>{review.SeqTitle}</div>
              <div class="top_info">
                <Star startNum={review?.starRate} />
              </div>
            <div>{review.reviewText}</div>
            </div> 
            <div className='poster_box' >
              {review.image ? (
                <img
                className='poster_img'
                src={review?.image}
                style={{ width: '6em' }}
                alt='리뷰사진'
                onError={(e) => e.target.src = defaultPhoto }
                />
                ):(
                  <></>
                  )}
            </div>
          </div>
          <div>{convertToKST(review.createdAt)}</div>
          <div class="review_btns">
            <Button variant="light" onClick={handleEditReview}>수정</Button>
            <Button variant="light" onClick={handleEeleteReview}>삭제</Button>
          </div> 
      </div>
      )}

    <AlertModal 
			showModal={showModal}
			setShowModal={setShowModal}
			selectedId={review._id}
			selectedName="리뷰삭제"
			alertMessage={`${review.SeqTitle}의 리뷰를 삭제하시겠습니까?`}
			btnText="리뷰삭제"
			/>
  </>
  )
}

export default MyReviewCard;