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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const MyReviewCard = ({ review,  openReviewForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { selectedReserve, loading, error } = useSelector(state => state.reservation);
  let canceled = '';

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
          <div className="card_main">
            <div className="card_top">
              <div className='review_title'>{review.SeqTitle}</div>
              <div className="top_info">
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
          <div className='review_date'>{convertToKST(review.createdAt)}</div>
          <div className="review_btns">
            <Button variant="light" onClick={handleEditReview}>수정</Button>
            <Button variant="light" onClick={handleEeleteReview}>삭제</Button>
          </div> 
        </div>
      ):(
        <div className='my_review_card'>
        <div className='suspend_msg'><FontAwesomeIcon icon={faCircleExclamation} />부적절한 내용으로 숨김처리됨 리뷰입니다. 자세한 사항은 1:1문의를 이용해주세요</div>
        <div className="card_main disabled">
            <div class="card_top">
              <div className='review_title'>{review.SeqTitle}</div>
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
          <div className="review_date disabled">{convertToKST(review.createdAt)}</div>
          <div className="review_btns">
            <Button className="disabled" variant="light" onClick={handleEditReview}>수정</Button>
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