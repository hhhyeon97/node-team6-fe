import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { reviewAction } from '../../action/reviewAction';

const InitialFormData = {
  starRate: 0,
  image: "",
  reviewText: "",
};

const ReviewDialog = ({ mode, showDialog, setShowDialog, searchQuery, setSearchQuery }) => {
  const dispatch = useDispatch();
  const { selectedReserve } = useSelector((state) => state.reservation);
  const { selectedReview } = useSelector((state) => state.review);
  const { error } = useSelector((state) => state.reservation);
  const [formData, setFormData] = useState({ ...InitialFormData });
  
  // const [formData, setFormData] = useState(
  //   mode === "new" ? { ...InitialFormData } : selectedReview
  // );

  // [ 리뷰 창 닫기 ]
  const handleClose = () => {
    setFormData({...InitialFormData}); // 모든걸 초기화시키고
    setShowDialog(false);// 창 닫아주기
  };

  // [ submit 버튼 ]
  const handleSubmit = (event) => {
    event.preventDefault();

    // 리뷰 작성하기
    dispatch(reviewAction.createReview({ ...formData }, 
      selectedReserve._id, 
      setShowDialog, setSearchQuery));
    // if (mode === "new") {
    // } else{
      // 리뷰 수정하기
      // dispatch(productActions.editProduct({...formData, stock: totalStock}, selectedProduct._id, setShowDialog, setSearchQuery))
    //} 
  };

  // [ form에 데이터 넣어주기 ]
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value});
  };

  // [ 이미지 업로드 ]
  const uploadImage = (url) => {
    setFormData({...formData, image: url});
  };

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton onClick={handleClose}>
        {mode === "new" ? (
          <Modal.Title>Create New Product</Modal.Title>
        ) : (
          <Modal.Title>Edit Product</Modal.Title>
        )}
      </Modal.Header>

      {/* 별점 */}
      <Form className="form-container" onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="starRate">
            <Form.Label>별점</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="Number"
              placeholder="별점을 입력하세요"
              required
              value={formData.starRate}
            />
          </Form.Group>

          {/* 리뷰 이미지 */}
          <Form.Group className="mb-3" controlId="Image" required>
            <Form.Label>Image</Form.Label>
            <CloudinaryUploadWidget uploadImage={uploadImage} />
            <img
              id="uploadedimage"
              src={formData.image}
              className="upload-image mt-2"
              alt="uploadedimage"
              style={{ width: '30%' }}
            ></img>
          </Form.Group>

          {/* 리뷰 내용 */}
          <Form.Group as={Col} controlId="reviewText">
            <Form.Label>reviewText</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="최소 15자 이상 입력해주세요"
              required
              value={formData.reviewText}
            />
          </Form.Group>
            
        {mode === "new" ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default ReviewDialog;