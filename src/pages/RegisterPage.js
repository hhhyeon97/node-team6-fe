import React, { useState, useEffect } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
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
  const [formError, setFormError] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [emailError, setEmailError] = useState('');
  // const error = useSelector((state) => state.user.error);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, loading, error } = useSelector((state) => state.user);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const register = (event) => {
    event.preventDefault();
    const { email, name, password, confirmPassword, contact } = formData;

    // 이름 유효성 검사
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      setFormError('이름은 한글이나 영어만 입력할 수 있습니다.');
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
      dispatch(userActions.resetError());
    }
    if (id === 'name') {
      setFormError('');
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
            isInvalid={!!formError}
          />
          <Form.Control.Feedback type="invalid">
            {formError}
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
          {gapMessage && (
            <span className="gap_message">
              <svg
                className="svg_icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                class="icon-md"
                style={{ color: 'rgb(226, 197, 65)', marginBottom: '3px' }}
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19a3 3 0 1 1-6 0M15.865 16A7.54 7.54 0 0 0 19.5 9.538C19.5 5.375 16.142 2 12 2S4.5 5.375 4.5 9.538A7.54 7.54 0 0 0 8.135 16m7.73 0h-7.73m7.73 0v3h-7.73v-3"
                ></path>
              </svg>{' '}
              {gapMessage}
            </span>
          )}
          {/* {passwordValid && (
            <span className="gap_message">
              <svg
                className="svg_icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                class="icon-md"
                style={{ color: 'rgb(226, 197, 65)', marginBottom: '3px' }}
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19a3 3 0 1 1-6 0M15.865 16A7.54 7.54 0 0 0 19.5 9.538C19.5 5.375 16.142 2 12 2S4.5 5.375 4.5 9.538A7.54 7.54 0 0 0 8.135 16m7.73 0h-7.73m7.73 0v3h-7.73v-3"
                ></path>
              </svg>{' '}
              {passwordValid}
            </span>
          )} */}
          {gapMessage ? null : <Form.Label>비밀번호</Form.Label>}
          {passwordValid}
          <div className="password_input_wrap">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="대문자, 숫자, 특수문자를 하나 이상 포함해 주세요"
              onChange={handleChange}
              required
              onFocus={() => {
                setPasswordError('');
                // setPasswordValid('');
                setGapMessage('');
              }}
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
            <Form.Control.Feedback type="invalid" className="d-block">
              {passwordError}
            </Form.Control.Feedback>
          </div>
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
