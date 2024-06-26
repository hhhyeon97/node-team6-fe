import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reservationAction } from '../action/reservationAction';

const AlertModal = ({showModal, setShowModal,selectedId, selectedName, selectedDate, alertMessage, btnText}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();


  const handleDelete = () => {
    if (btnText === '예매취소') {
      console.log('예매취소')
      dispatch(reservationAction.deleteReservation(selectedId, navigate));
      setShowModal(false);
    }
  }

  return (
  <>
      <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>{selectedName} 관람일자: {selectedDate}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{alertMessage}</Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            {btnText}
          </Button>
      </Modal.Footer>
      </Modal>
  </>
  );
}

export default AlertModal;