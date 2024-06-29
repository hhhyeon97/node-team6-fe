import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { noticeAction } from '../../action/noticeAction';
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import defaultPhoto from "../../assets/img/default_photo.png"

const InitialFormData = {
  title: "",
  img: "",
  content: "",
  isImportant: false,
};

const NoticeDialog = ({ mode, showDialog, setShowDialog, setSearchQuery }) => {
  const dispatch = useDispatch();
  const { selectedNotice, error } = useSelector((state) => state.notice);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false)
  const [checkImportant, setCheckImportant] = useState(false)
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedNotice
  );
  const user = useSelector(state => state.user);
  console.log(user)

  // [ 다이얼로그 닫기 ]
  const handleClose = () => {
    setFormData({ ...InitialFormData });
    setShowDialog(false);
    setCheckImportant(false);
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit" && selectedNotice) {
        setFormData({
          title: selectedNotice.title,
          img: selectedNotice.img,
          content: selectedNotice.content,
          isImportant: selectedNotice.isImportant
        });
      } else {
        setFormData({ ...InitialFormData });
      }
    }
  }, [showDialog, selectedNotice, mode]);
  

  // [ form에 데이터 넣어주기 ]
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value});
    if (id === "content") {
      checkContentLength(value);
    }
    if (id === "title"){
      checkTitleLength(value);
    }
  };

  // [ content 길이 확인 및 에러 처리 ]
  const checkContentLength = (value) => {
    if (value.length < 15) {
      setContentError(true);
    } else {
      setTitleError(false);
    }
  };

  // [ title 길이 확인 및 에러 처리 ]
  const checkTitleLength = (value) => {
    if (value.length < 15) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
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
      dispatch(noticeAction.editNotice({ ...formData }, selectedNotice._id, setShowDialog, setSearchQuery))
    } 
  };

  // [ 이미지 업로드 ]
  const uploadImage = (url) => {
    setFormData({...formData, img: url});
  };

  // [ 이미지 깨질때 ]
  const handleImageError = (event) => {
    event.target.style.display = 'none';
  };

  // if (!selectedNotice) {
  //   return <></>;
  // }
  
  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}>
        {mode === "new" ? (
          <Modal.Title>공지사항 작성</Modal.Title>
        ) : (
          <Modal.Title>공지사항 수정</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <Form className='notice-form-container' onSubmit={handleSubmit}>
          <Row className="mb-3">
            <div>작성자 : {mode === "new"? user.user.name : mode === "edit" && selectedNotice?.userId.name}</div>
            <Form.Group as={Col} controlId="title">
              <Form.Label>제목</Form.Label>
              {titleError && (
                <span className="error-message">4자 이상 25자 이하로 입력하세요</span>
              )}
              <Form.Control
                onChange={handleChange}
                type="string"
                placeholder="4자 이상 25자 이하로 작성해주세요"
                required
                value={formData.title}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="isImportant">
              <Form.Check
                type="checkbox"
                label="중요표시"
                // onChange={handleChange}
                name="isImportant"
                checked={formData.isImportant}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image" required>
              <Form.Label>사진</Form.Label>
              <CloudinaryUploadWidget uploadImage={uploadImage} />
                <div className='upload_img_box'>
                  <img
                  id="uploadedimage"
                  src={formData.img}
                  className="upload-image"
                  alt="uploadedimage"
                  // onError={handleImageError}
                  onError={(e) => e.target.src = defaultPhoto }
                  ></img>
                </div>
            </Form.Group>

            <Form.Group as={Col} controlId="content">
              <Form.Label>내용</Form.Label>
              {contentError && (
                <span className="error-message">15자 이상 입력하세요</span>
              )}
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