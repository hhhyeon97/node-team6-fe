import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { reviewAction } from '../../action/reviewAction';
import { convertToKST } from "../../utils/Date";
import defaultPhoto from "../../assets/img/default_photo.png"
import Star from '../../component/Star';

const ReviewDetailDialog = ({ open, handleClose, setSearchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedReview } = useSelector((state) => state.review);
  const [reviewState, setReviewState] = useState(false);

  useEffect(() => {
    if (selectedReview) {
      setReviewState(selectedReview.isSuspended);
    }
  }, [selectedReview]);

  // [ 리뷰 상태 바꾸기 ]
  const handleCheckboxChange = () => {
    setReviewState(prevState => !prevState);
  };
  console.log("check",reviewState)

  // [ 리뷰 상태 수정 ]
  const submitStatus = () => {
    dispatch(reviewAction.updateReviewState(selectedReview._id, reviewState, setSearchQuery));
    handleClose();
  };

  // [ 포스터를 누르면 해당 공연 디테일 페이지로 이동 ]
  const handlePosterClick = (event) => {
    event.stopPropagation(); // 클릭 이벤트의 전파를 막음
    navigate(`/performance/${selectedReview.ticket.SeqId}`);
  };

  // [ 이미지 깨질때 ]
  const handleImageError = (event) => {
    event.target.style.display = 'none';
  };

  if (!selectedReview) {
    return <></>;
  }
  
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>리뷰 상세정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="review_detail_modal">
        <div class="perform_infos">
          {/* <div className='poster_box' onClick={handlePosterClick} >
            {selectedReview.reservationId.ticket.SeqImage ? (
              <img
              className='poster_img'
              src={selectedReview.reservationId.ticket.SeqImage}
              style={{ width: '6em' }}
              alt='리뷰공연 포스터'
              onError={(e) => e.target.src = defaultPhoto }
              />
            ):(
              <img
              className='poster_img'
              src={selectedReview.reservationId.ticket.SeqImage}
              style={{ width: '6em' }}
              alt='리뷰공연 포스터'
              onError={handleImageError}
              />
              )}
            </div> */}
        </div>
        
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status" className='suspend_review_area'>
              <Form.Check
                type="checkbox"
                label="리뷰숨김"
                name="isSuspend"
                checked={reviewState}
                onChange={handleCheckboxChange}
              />
          </Form.Group>
          <div className='poster_box' onClick={handlePosterClick} >
          {selectedReview.image ? (
            <img
              className='poster_img'
              src={selectedReview.image}
              style={{ width: '6em' }}
              alt='리뷰사진'
              onError={(e) => e.target.src = defaultPhoto }
              />
          ):(
            <img
              className='poster_img'
              src={selectedReview.image}
              style={{ width: '6em' }}
              alt='리뷰사진'
              onError={handleImageError}
              />
          )}
        </div>
        <div class="review_info_group">
          <div>공연정보 : {selectedReview.reservationId.ticket.SeqTitle}</div>
          <div>등록일자 : {convertToKST(selectedReview.createdAt)}</div>
          <div>작성자 : {selectedReview.userId.name}</div>
          <div className="star_rate_info">
            <p>별점 : </p>&nbsp; <Star startNum={selectedReview?.starRate} />
          </div>
        </div>
        {/* <div>회원등급 : {selectedReview.userId.level.toUpperCase()}</div> */}
        <div>리뷰내용 : 
          <div class="review_content">{selectedReview.reviewText}</div>
        </div>

            <div className="order-button-area">
              {/* <Button
                variant="light"
                onClick={handleClose}
                className="order-button"
              >
                닫기
              </Button> */}
              <Button type="submit" variant='dark'>저장</Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewDetailDialog;