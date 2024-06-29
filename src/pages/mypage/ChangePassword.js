import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyPageLayout from '../../Layout/MyPageLayout';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { userActions } from '../../action/userAction';
import '../../style/css/PasswordPage.css';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gapMessage, setGapMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // 이거를 걸고 싶은데 성공했을 때 로그인 페이지로 보내는게 안 되고 있음
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/mypage/verify-password'); // 인증되지 않은 경우 인증 페이지로 이동
  //   }
  // }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.includes(' ')) {
      setGapMessage('비밀번호에는 공백을 포함할 수 없습니다.');
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setGapMessage(
        '비밀번호는 최소 8자 이상, 하나의 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.',
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    dispatch(userActions.changePassword(newPassword, navigate));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <MyPageLayout title="나의 계정" cap="비밀번호 변경">
      <Container className="password_change_area d-flex justify-content-center align-items-center">
        {/* {gapMessage && (
          <div>
            <Alert variant="danger" className="error_message">
              {gapMessage}
            </Alert>
          </div>
        )} */}
        {gapMessage && (
          <div className="error_message">
            <svg
              className="svg_icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              class="icon-md"
              style={{ color: 'rgb(231, 94, 94)', marginBottom: '3px' }}
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19a3 3 0 1 1-6 0M15.865 16A7.54 7.54 0 0 0 19.5 9.538C19.5 5.375 16.142 2 12 2S4.5 5.375 4.5 9.538A7.54 7.54 0 0 0 8.135 16m7.73 0h-7.73m7.73 0v3h-7.73v-3"
              ></path>
            </svg>
            {gapMessage}
          </div>
        )}
        <Form className="reset_password_form" onSubmit={handleSubmit}>
          {/* {error && (
            <Alert variant="danger" className="error_message">
              {error}
            </Alert>
          )} */}
          {error && (
            <div className="error_message">
              <svg
                className="svg_icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                class="icon-md"
                style={{ color: 'rgb(231, 94, 94)', marginBottom: '3px' }}
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19a3 3 0 1 1-6 0M15.865 16A7.54 7.54 0 0 0 19.5 9.538C19.5 5.375 16.142 2 12 2S4.5 5.375 4.5 9.538A7.54 7.54 0 0 0 8.135 16m7.73 0h-7.73m7.73 0v3h-7.73v-3"
                ></path>
              </svg>
              {error}
            </div>
          )}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>새 비밀번호</Form.Label>
            <div className="password_input_wrap">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
          <button className="submit_btn" type="submit" disabled={loading}>
            {loading ? '변경 중...' : '비밀번호 재설정'}
          </button>
        </Form>
      </Container>
    </MyPageLayout>
  );
};

export default ChangePassword;
