import React from "react";
import MyPageLayout from '../../Layout/MyPageLayout';
import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../action/userAction';
import UserProfile from '../../component/UserProfile';
import { Form, Col } from 'react-bootstrap';
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";

  // 초기 폼 데이터 설정
  let initialFormData = {
    name: '',
    email: '', 
    contact: null
  };

// 회원정보 수정 컴포넌트
const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    image:'',
    name: '',
    email: '',
    contact: null
  });

  // [ 유저 정보 받아오기 ]
  useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  // [ user가 로딩되면 초기 데이터 설정 ]
  useEffect(() => {
    if (user) {
      setFormData({
        image: user.image || '',
        name: user.name || '',
        email: user.email || '',
        contact: user.contact || null
      });
    }
  }, [user]);

  // [ form 요소 변화처리 ]
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value});
    console.log('formData', formData)
  };

  // [ 이미지 업로드 ]
  const uploadImage = (url) => {
    setFormData({...formData, image: url});
  };
  
  return (
    <MyPageLayout title="나의 계정" cap="회원정보 수정">
        <div>
          <Form className='edit_user_form_container'>
          <Form.Group as={Col} controlId="image">
              <Form.Label>프로필 이미지</Form.Label>
              <CloudinaryUploadWidget uploadImage={uploadImage} />
              <img
                id="uploadedimage"
                src={formData.image}
                className="upload-image mt-2"
                alt="uploadedimage"
              ></img>
          </Form.Group>
          
          <Form.Group as={Col} controlId="image">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="2자이상 10자 이하로 입력해주세요"
                required
                defaultValue={formData.email}
                />
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label>이름</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="2자이상 10자 이하로 입력해주세요"
                required
                defaultValue={formData.name}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="2자이상 10자 이하로 입력해주세요"
                required
                defaultValue={formData.email}
                />
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label>연락처</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="2자이상 10자 이하로 입력해주세요"
                required
                defaultValue={formData.contact}
                />
            </Form.Group>

          </Form>
        </div>
    </MyPageLayout>
  )
}

export default EditProfile;