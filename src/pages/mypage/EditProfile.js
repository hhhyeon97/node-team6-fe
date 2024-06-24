import React, { useEffect, useState } from "react";
import MyPageLayout from "../../Layout/MyPageLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userActions } from "../../action/userAction";
import { Form, Col, Alert } from "react-bootstrap";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";

// 회원정보 수정 컴포넌트
const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    contact: "",
  });

  // [ 유저 정보 받아오기 ]
  useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  // [ user가 로딩되면 초기 데이터 설정 ]
  useEffect(() => {
    if (user) {
      setFormData({
        image: user.image || "",
        name: user.name || "",
        email: user.email || "",
        contact: user.contact || "",
      });
    }
  }, [user]);

  // [ form 요소 변화처리 ]
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // [ 이미지 업로드 ]
  const uploadImage = (url) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  // [ 저장하기(submit) ]
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userActions.editUser({ ...formData }, navigate));
  };

  return (
    <MyPageLayout title="나의 계정" cap="회원정보 수정">
      <div>
      {error && (
        <div>
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        </div>
      )}
        <Form className="edit_user_form_container" onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="image">
            <Form.Label>프로필 이미지</Form.Label>
            <CloudinaryUploadWidget uploadImage={uploadImage} />
            <div class="edit_image_box">
              <img
                id="uploadedimage"
                src={formData.image === '' ? 
                  'https://iconspng.com/_next/image?url=https%3A%2F%2Ficonspng.com%2Fimages%2Fabstract-user-icon-3%2Fabstract-user-icon-3.jpg&w=1080&q=75'
                  : formData.image}
                className="upload-image"
                alt="uploadedimage"
              ></img>
            </div>
          </Form.Group>

          <Form.Group as={Col} controlId="email">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="2자이상 10자 이하로 입력해주세요"
              required
              value={formData.email}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="name">
            <Form.Label>이름</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="2자이상 10자 이하로 입력해주세요"
              required
              value={formData.name}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="contact">
            <Form.Label>연락처</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="2자이상 10자 이하로 입력해주세요"
              required
              value={formData.contact}
            />
          </Form.Group>

          <button className="edit_submit_btn" type="submit">
            저장하기
          </button>
        </Form>
      </div>
    </MyPageLayout>
  );
};

export default EditProfile;
