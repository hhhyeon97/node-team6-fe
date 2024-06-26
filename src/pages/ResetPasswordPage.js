import React, { useState, useEffect } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import '../style/css/ResetPasswordPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { user } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gapMessage, setGapMessage] = useState('');
  //   useEffect(() => {
  //     dispatch(userActions.checkResetToken(token));
  //   }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호에 공백이 있는지 확인
    if (password.includes(' ')) {
      setGapMessage('비밀번호에는 공백을 포함할 수 없습니다.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    dispatch(userActions.resetPassword({ password, token }, navigate));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container className="reset_password_area d-flex justify-content-center align-items-center">
      <h2 className="title">비밀번호 재설정</h2>
      {gapMessage && <span className="gap_message">💡 {gapMessage}</span>}
      <Form className="reset_password_form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>새 비밀번호</Form.Label>
          <div className="password_input_wrap">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="새 비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() => {
                setErrorMessage('');
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
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>새 비밀번호 재확인</Form.Label>
          <div className="password_input_wrap">
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="새 비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              isInvalid={!!errorMessage}
              onFocus={() => {
                setErrorMessage('');
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
              {errorMessage}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
        <button className="submit_btn" type="submit">
          비밀번호 재설정
        </button>
      </Form>
    </Container>
  );
};

export default ResetPasswordPage;
