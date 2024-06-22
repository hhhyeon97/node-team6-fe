import React, { useState, useEffect } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import '../style/css/RegisterPage.css';
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
  const [contactError, setContactError] = useState('');
  const [formError, setFormError] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const error = useSelector((state) => state.user.error);
  const register = (event) => {
    event.preventDefault();
    const { email, name, password, confirmPassword, contact } = formData;
    // 비번 중복 확인 일치하는지 확인
    if (password !== confirmPassword) {
      setPasswordError('비밀번호 중복 확인이 일치하지 않습니다 !');
      return;
    }

    // 전화번호 유효성 검사
    const cleanedContact = contact.replace(/\D/g, '');
    if (cleanedContact.length !== 11) {
      setContactError('전화번호는 11자리 숫자여야 합니다.');
      return;
    }

    setPasswordError('');
    setContactError('');
    setFormError('');
    setEmailError('');
    // setPasswordError(false);

    // FormData에 있는 값을 가지고 백엔드로 넘겨주기
    dispatch(
      userActions.registerUser({ name, email, password, contact }, navigate),
    );
    //성공후 로그인 페이지로 넘어가기
  };

  const handleChange = (event) => {
    event.preventDefault();
    // 값을 읽어서 FormData에 넣어주기
    const { id, value } = event.target;
    const formattedValue = id === 'contact' ? formatPhoneNumber(value) : value;

    // setFormData({ ...formData, [id]: value });
    setFormData({ ...formData, [id]: formattedValue });

    if (id === 'contact') {
      const cleanedContact = formattedValue.replace(/\D/g, '');
      if (cleanedContact.length === 11) {
        setContactError('');
      }
    }

    if (id === 'email') {
      setEmailError('');
      setFormError('');
      dispatch(userActions.resetError());
    }
  };

  const formatPhoneNumber = (value) => {
    let cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length > 11) {
      cleanValue = cleanValue.slice(0, 11);
    }
    const match = cleanValue.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);

    if (match) {
      const formattedValue = [match[1], match[2], match[3]]
        .filter(Boolean)
        .join('-'); // 각 그룹을 '-'로 연결
      return formattedValue;
    }

    return cleanValue; // 매치되지 않으면 숫자만 반환
  };

  useEffect(() => {
    dispatch(userActions.resetError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setEmailError(error);
    }
  }, [error]);

  return (
    <Container className="register_area d-flex justify-content-center align-items-center">
      <h2 className="register_title">JOIN</h2>
      {/* {error && (
        <div className="register_error_message">
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        </div>
      )} */}
      <Form className="register_form" onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
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
            value={formData.contact}
            onChange={handleChange}
            required
            isInvalid={!!contactError}
          />
          <Form.Control.Feedback type="invalid">
            {contactError}
          </Form.Control.Feedback>
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
            isInvalid={!!passwordError}
            // isValid={passwordValid}
            onFocus={() => setPasswordError('')}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
          {/* <Form.Control.Feedback type="valid">
            비밀번호가 일치합니다.
          </Form.Control.Feedback> */}
        </Form.Group>
        <button type="submit" className="register_btn">
          회원가입
        </button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
