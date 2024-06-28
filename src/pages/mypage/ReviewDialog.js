import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { reviewAction } from '../../action/reviewAction';
import defaultPhoto from "../../assets/img/default_photo.png"

const InitialFormData = {
  starRate: 0,
  image: "",
  reviewText: "",
};

const ReviewDialog = ({ mode, showDialog, setShowDialog, searchQuery, setSearchQuery }) => {
  const dispatch = useDispatch();
  const { selectedReserve } = useSelector((state) => state.reservation);
  const { selectedReview } = useSelector((state) => state.review);
  // const { error } = useSelector((state) => state.reservation);
  const { error } = useSelector((state) => state.review);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [formData, setFormData] = useState({ ...InitialFormData });
  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedReview
  );
  console.log('mode', mode)
  console.log("selectedReview", selectedReview)

  useEffect(() => {
    if (error) {
      setErrorMessage(error); // Redux store의 error 상태가 변경되면 로컬 상태에 에러 메시지를 업데이트합니다.
    } else {
      setErrorMessage(null); // 에러가 없을 경우 초기화합니다.
    }
  }, [error]);

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit" && selectedReview) {
        setFormData({
          starRate: selectedReview.starRate,
          image: selectedReview.image,
          reviewText: selectedReview.reviewText
        });
      } else {
        setFormData({ ...InitialFormData });
      }
    }
  }, [showDialog, selectedReview, mode]);

  // [ 리뷰 창 닫기 ]
  const handleClose = () => {
    setFormData({...InitialFormData}); // 모든걸 초기화시키고
    setShowDialog(false);// 창 닫아주기
  };

  // [ submit 버튼 ]
  const handleSubmit = (event) => {
    event.preventDefault();
    if(mode === "new"){
      console.log("리뷰작성")
      dispatch(reviewAction.createReview({ ...formData }, 
        selectedReserve._id, 
        setShowDialog, setSearchQuery));
    }else{
      console.log("리뷰수정")
      dispatch(reviewAction.editReview({ ...formData }, 
        selectedReview._id,
        setShowDialog, setSearchQuery));
    }
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
      <div className="review_modal_container">
        <Modal.Header className='review_modal_header' closeButton onClick={handleClose}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Modal.Title>리뷰</Modal.Title>
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
                value={formData?.starRate}
              />
            </Form.Group>
            {/* 리뷰 이미지 */}
            <Form.Group className="mb-3 review_img_area" controlId="Image" required>
              {/* <Form.Label>Image</Form.Label> */}
              <div class="review_img">
                <img
                  id="uploadedimage"
                  src={formData?.image}
                  className="upload-image"
                  alt="리뷰사진"
                  // style={{ width: '30%' }}
                  onError={(e) => e.target.src = defaultPhoto }
                ></img>
              </div>
              <div className="img_uploade_btn">
                <CloudinaryUploadWidget uploadImage={uploadImage} />
              </div>
            </Form.Group>
            {/* 리뷰 내용 */}
            <Form.Group as={Col} controlId="reviewText">
              <Form.Label>reviewText</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="최소 15자 이상 입력해주세요"
                required
                value={formData?.reviewText}
              />
            </Form.Group>
        
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
      </div>
    </Modal>
  );
};

export default ReviewDialog;
