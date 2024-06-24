import React, { useState } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { convertToKST } from "../../utils/Date";

const NoticeDetailDialog = ({ open, handleClose, setSearchQuery }) => {
  const dispatch = useDispatch();
  const selectedNotice = useSelector((state) => state.notice.selectedNotice);

  if (!selectedNotice) {
    return <></>;
  }
  
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Notice Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>작성자 : {selectedNotice.userId.name}</div>
        <div>제목 : {selectedNotice.title}</div>
        <div>이미지 : </div>
        <div>내용 : {selectedNotice.content}</div>
        <div>조회수 : {selectedNotice.view}</div>
        <div>중요표시 : {selectedNotice.isImportant === false ? '안중요' : '중요'}</div>
        <div>등록일자 : {convertToKST(selectedNotice.createdAt)}</div>
          
        {/* <Form onSubmit={submitLevel}>
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
        </Form> */}
      </Modal.Body>
    </Modal>
  );
};

export default NoticeDetailDialog;