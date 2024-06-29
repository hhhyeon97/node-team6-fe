import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reservationAction } from '../action/reservationAction';
import { noticeAction } from '../action/noticeAction';
import { userActions } from '../action/userAction';
import { reviewAction } from '../action/reviewAction';

const AlertModal = ({showModal, setShowModal,selectedId, selectedName, selectedDate, alertMessage, btnText}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleDelete = (event) => {
    if (btnText === '예매취소') {
      console.log('예매취소')
      dispatch(reservationAction.cancelReservation(selectedId, navigate));
      setShowModal(false);
    }else if(btnText === '공지삭제'){
      console.log('공지삭제')
      dispatch(noticeAction.deleteNotice(selectedId, navigate));
      setShowModal(false);
    }else if(btnText === '회원탈퇴'){
      console.log('회원탈퇴')
      dispatch(userActions.deleteUser(selectedId, navigate));
    }else if(btnText === '리뷰삭제'){
      console.log('리뷰삭제')
      dispatch(reviewAction.deleteReview(selectedId, navigate));
    }
  }

  return (
  <>
      <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>{selectedName} {selectedDate}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{alertMessage}</Modal.Body>
      <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            취소
          </Button>
        <Button variant="light" onClick={handleDelete} style={{border:'1px solid #000'}}>
            {btnText}
          </Button>
      </Modal.Footer>
      </Modal>
  </>
  );
}

export default AlertModal;