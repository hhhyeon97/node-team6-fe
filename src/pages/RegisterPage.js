import React, { useState, useEffect } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import '../style/RegisterPage.css';
const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    contact: '',
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const error = useSelector((state) => state.user.error);

  const register = (event) => {
    event.preventDefault();
    const { email, name, password, confirmPassword, contact } = formData;
    // 비번 중복 확인 일치하는지 확인
    if (password !== confirmPassword) {
      setPasswordError('비밀번호 중복 확인이 일치하지 않습니다 !');
      return;
    }
    // FormData에 있는 값을 가지고 백엔드로 넘겨주기
    setPasswordError('');
    setPasswordError(false);
    dispatch(
      userActions.registerUser({ name, email, password, contact }, navigate),
    );
    //성공후 로그인 페이지로 넘어가기
  };

  const handleChange = (event) => {
    event.preventDefault();
    // 값을 읽어서 FormData에 넣어주기
    const { id, value, checked } = event.target;
    // console.log(id, checked);
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    dispatch(userActions.resetError());
  }, [dispatch]);

  return (
    <Container className="register_area d-flex justify-content-center align-items-center">
      <h2 className="register_title">JOIN</h2>
      {error && (
        <div className="register_error_message">
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        </div>
      )}
      <Form className="register_form" onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            id="contact"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            isInvalid={passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <button type="submit" className="register_btn">
          회원가입
        </button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
