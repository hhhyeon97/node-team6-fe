import React, { useState } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from '../../action/reviewAction';
import { convertToKST } from "../../utils/Date";

const ReviewDetailDialog = ({ open, handleClose, setSearchQuery }) => {
  const dispatch = useDispatch();
  const { selectedReview } = useSelector((state) => state.review);
  const [checkSuspend, setCheckSuspend] = useState(false)


  // [ 리뷰 상태 바꾸기 ]
  const handleCheckboxChange = () => {
    setCheckSuspend(prevState => !prevState); // 이전 상태 값을 사용하여 토글
  };
  console.log("check",checkSuspend)

  // [ 리뷰 상태 수정 ]
  const submitStatus = () => {
    dispatch(reviewAction.updateReviewState(selectedReview._id, checkSuspend, setSearchQuery));
    handleClose();
  };

  if (!selectedReview) {
    return <></>;
  }
  
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Review Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>공연정보 : {selectedReview.reservationId.ticket.SeqTitle}</div>
        <div>작성자 : {selectedReview.userId.name}</div>
        <div>회원등급 : {selectedReview.userId.level.toUpperCase()}</div>
        <div>리뷰내용 : {selectedReview.userId.email}</div>
        <div>등록일자 : {convertToKST(selectedReview.createdAt)}</div>
          
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
              <Form.Check
                type="checkbox"
                label="리뷰숨김"
                name="isSuspend"
                checked={checkSuspend}
                onChange={handleCheckboxChange}
              />
          </Form.Group>

          <div className="order-button-area">
            <Button
              variant="light"
              onClick={handleClose}
              className="order-button"
            >
              닫기
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewDetailDialog;