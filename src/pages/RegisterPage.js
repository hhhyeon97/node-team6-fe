import React, { useState, useEffect } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetError, userActions } from '../action/userAction';
import '../style/css/RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingText from '../component/LoadingText';
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
  const [gapMessage, setGapMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [emailError, setEmailError] = useState('');
  const error = useSelector((state) => state.user.error);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, loading } = useSelector((state) => state.user);
  // const [error, setError] = useState('');
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const register = (event) => {
    event.preventDefault();
    const { email, name, password, confirmPassword, contact } = formData;

    if (!emailRegex.test(email)) {
      setEmailError('유효한 이메일 주소를 입력해 주세요.');
      return;
    }

    // 이름 유효성 검사
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      setNameError('이름은 한글이나 영어만 입력할 수 있습니다.');
      return;
    }
    // 전화번호 유효성 검사
    const cleanedContact = contact.replace(/\D/g, '');
    if (cleanedContact.length !== 11) {
      setContactError('전화번호는 11자리 숫자여야 합니다.');
      return;
    }

    // 비밀번호에 공백이 있는지 확인
    if (password.includes(' ')) {
      setGapMessage('비밀번호에는 공백을 포함할 수 없습니다.');
      return;
    }

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
      setGapMessage(
        '비밀번호는 최소 8자 이상, 하나의 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.',
      );
      return;
    }

    // 비번 중복 확인 일치하는지 확인
    if (password !== confirmPassword) {
      setPasswordError('비밀번호 중복 확인이 일치하지 않습니다 !');
      return;
    }

    setPasswordError('');
    setContactError('');
    setNameError('');
    setEmailError('');
    setGapMessage('');

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
      dispatch(userActions.resetError());
    }
    if (id === 'name') {
      setNameError('');
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
    if (error === '이미 가입된 사용자입니다!') {
      setEmailError(error);
    }
  }, [error]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    <LoadingText />;
  }

  return (
    <Container className="register_area d-flex justify-content-center align-items-center">
      <h2 className="register_title">회원가입</h2>
      <Form className="register_form" onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="ex) noonaculture@naver.com"
            onChange={handleChange}
            required
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="한글 또는 영어로 입력해 주세요"
            onChange={handleChange}
            required
            isInvalid={!!nameError}
          />
          <Form.Control.Feedback type="invalid">
            {nameError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>연락처</Form.Label>
          <Form.Control
            type="text"
            id="contact"
            placeholder="전화번호 11자리를 입력해 주세요"
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
          <Form.Label>비밀번호</Form.Label>
          <div className="password_input_wrap">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="대문자, 숫자, 특수문자를 하나 이상 포함해 주세요"
              onChange={handleChange}
              required
              onFocus={() => {
                setPasswordError('');
                setPasswordValid('');
                setGapMessage('');
              }}
              isInvalid={!!gapMessage}
            />
            <span
              className="password_toggle_icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
            <Form.Control.Feedback type="invalid">
              {gapMessage}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호 재확인</Form.Label>
          <div className="password_input_wrap">
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="비밀번호를 재 입력해 주세요"
              onChange={handleChange}
              required
              isInvalid={!!passwordError}
              onFocus={() => {
                setPasswordError('');
                setGapMessage('');
              }}
            />
            <span
              className="password_toggle_icon"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <button type="submit" className="register_btn">
          회원가입
        </button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
