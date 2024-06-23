import React, { useState } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { USER_LEVELS } from '../../constants/user.constants';
import { userActions } from '../../action/userAction';

const UserDetailDialog = ({ open, handleClose, setSearchQuery }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const [level, setLevel] = useState(selectedUser.level);

  // [ 회원레벨 바꾸기 ]
  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };
  const submitLevel = () => {
    dispatch(userActions.updateUserLevel(selectedUser._id, level, setSearchQuery));
    handleClose();
  };

  if (!selectedUser) {
    return <></>;
  }
  
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>회원명 : {selectedUser.name}</div>
        <div>회원등급 : {selectedUser.level.toUpperCase()}</div>
        <div>이메일 : {selectedUser.email}</div>
        <div>연락처 : {selectedUser.contact}</div>
        <div>가입일자 : {selectedUser.createdAt}</div>
          
        <Form onSubmit={submitLevel}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={level} onChange={handleLevelChange}>
              {USER_LEVELS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item.toUpperCase()}
                </option>
              ))}
            </Form.Select>
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

export default UserDetailDialog;