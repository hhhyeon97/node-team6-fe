import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import '../style/css/FindPasswordPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { useNavigate } from 'react-router-dom';
const FindPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userActions.forgotPassword({ email }, navigate));
  };

  const handleEmailFocus = () => {
    dispatch(userActions.resetError()); // 에러 상태 초기화 액션 디스패치
  };

  return (
    <Container className="find_password_area  d-flex justify-content-center align-items-center">
      <h2 className="title">비밀번호 재발급</h2>
      <Form className="find_password_form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onFocus={handleEmailFocus}
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <button className="submit_btn" type="submit">
          비밀번호 재발급
        </button>
      </Form>
    </Container>
  );
};

export default FindPasswordPage;
