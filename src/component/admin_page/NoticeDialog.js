import React, { useState } from "react";
import { Form, Modal, Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { noticeAction } from '../../action/noticeAction';
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";

const InitialFormData = {
  title: "",
  image: "",
  content: "",
  isImportant: false,
};

const NoticeDialog = ({ mode, showDialog, setShowDialog, setSearchQuery }) => {
  const dispatch = useDispatch();
  const selectedNotice = useSelector((state) => state.notice.selectedNotice);
  const [checkImportant, setCheckImportant] = useState(false)
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedNotice
  );
  console.log("mode:", mode)
  // [ 다이얼로그 닫기 ]
  const handleClose = () => {
    setFormData({...InitialFormData});
    setShowDialog(false);
  };

  // [ form에 데이터 넣어주기 ]
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value, type, checked } = event.target;
    setFormData({ ...formData, [id]: value});
    // console.log("formData",formData)
  };

  // [ 중요표시 토글 ]
  const handleCheckboxChange = () => {
    setCheckImportant(prevState => !prevState); // 이전 상태 값을 사용하여 토글
    setFormData({ ...formData, isImportant: !checkImportant });
  };

  // [ submit 버튼 ]
  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === "new") {
      //새 상품 만들기
      dispatch(noticeAction.createNotice({ ...formData },setShowDialog, setSearchQuery));
    } else{
      // 상품 수정하기
      // dispatch(productActions.editProduct({...formData, stock: totalStock}, selectedProduct._id, setShowDialog, setSearchQuery))
    } 
  };

  // [ 이미지 업로드 ]
  const uploadImage = (url) => {
    setFormData({...formData, image: url});
  };

  // [ 이미지 깨질때 ]
  const handleImageError = (event) => {
    event.target.style.display = 'none';
  };

  console.log("checkIm",checkImportant)
  console.log('form:',formData)

  if (!selectedNotice) {
    return <></>;
  }
  
  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>공지사항 작성</Modal.Title>
        ) : (
          <Modal.Title>공지사항 수정</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <Form className='notice-form-container' onSubmit={handleSubmit}>
          <Row className="mb-3">
            <div>작성자 : {selectedNotice.userId.name}</div>
            <Form.Group as={Col} controlId="title">
              <Form.Label>제목</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="string"
                placeholder="최소 4자 이상 작성해주세요"
                required
                value={formData.name}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="isImportant">
              <Form.Check
                type="checkbox"
                label="중요표시"
                // onChange={handleChange}
                name="isImportant"
                checked={checkImportant}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image" required>
              <Form.Label>사진</Form.Label>
              <CloudinaryUploadWidget uploadImage={uploadImage} />
                <div class="upload_img_box">
                  <img
                  id="uploadedimage"
                  src={formData.image ? formData.image : ""}
                  className="upload-image"
                  alt="uploadedimage"
                  // onError={handleImageError}
                  ></img>
                </div>
            </Form.Group>

            <Form.Group as={Col} controlId="content">
              <Form.Label>내용</Form.Label>
              <Form.Control
                className='notice_content'
                as="textarea"
                rows={5}
                onChange={handleChange}
                type="string"
                placeholder="최소 15자 이상 작성해주세요"
                required
                value={formData.content}
              />
            </Form.Group>
          </Row>
            {mode === "new" ? (
              <Button variant="dark" type="submit">
                Submit
              </Button>
              ) : (
              <Button variant="dark" type="submit">
                Edit
              </Button>
            )}
        </Form> 

      </Modal.Body>
    </Modal>
  );
};

export default NoticeDialog;