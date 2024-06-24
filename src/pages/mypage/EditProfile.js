import React from "react";
import MyPageLayout from '../../Layout/MyPageLayout';
import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../action/userAction';
import UserProfile from '../../component/UserProfile';
import { Form, Col } from 'react-bootstrap';

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
  const [formData, setFormData] = useState({ ...initialFormData });
  
  // [ user loading ]
  if (!user) {
    return <div>Loading...</div>; // 또는 다른 적절한 로딩 표시
  }

  // 초기 폼 데이터 설정
  const defaultForm = () => {
    setFormData ={
      name: user.name || '', // user가 undefined인 경우를 대비하여 기본값 '' 설정
      email: user.email || '', // user가 undefined인 경우를 대비하여 기본값 '' 설정
      contact: user.contact || '', // user가 undefined인 경우를 대비하여 기본값 '' 설정
    }
  }

  // [ form 요소 변화처리 ]
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value});
  };
  
  return (
    <MyPageLayout title="나의 계정" cap="회원정보 수정">
        <div>
          <Form className='edit_user_form_container'>
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

          </Form>
        </div>
    </MyPageLayout>
  )
}

export default EditProfile;