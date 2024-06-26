import React, { useEffect, useState } from 'react';
import LoadingText from '../../component/LoadingText';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyPageLayout from '../../Layout/MyPageLayout';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { userActions } from '../../action/userAction';

const EditPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading, success } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gapMessage, setGapMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.includes(' ')) {
      setGapMessage('비밀번호에는 공백을 포함할 수 없습니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    dispatch(
      userActions.changePassword({ currentPassword, newPassword }, navigate),
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <MyPageLayout title="나의 계정" cap="비밀번호 변경">
      {gapMessage && (
        <div>
          <Alert variant="danger" className="error_message">
            {gapMessage}
          </Alert>
        </div>
      )}
      <Form className="reset_password_form" onSubmit={handleSubmit}>
        {error && (
          <Alert variant="danger" className="error_message">
            {error}
          </Alert>
        )}
        <Form.Group controlId="formBasicCurrentPassword">
          <Form.Label>현재 비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <div className="password_input_wrap">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="변경할 비밀번호를 입력하세요"
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
          <Form.Label>비밀번호 재확인</Form.Label>
          <div className="password_input_wrap">
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="변경할 비밀번호를 다시 입력하세요"
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
        {/* <button className="submit_btn" type="submit">
          비밀번호 변경하기
        </button> */}
        <button className="submit_btn" type="submit" disabled={loading}>
          {loading ? '변경 중...' : '비밀번호 재설정'}
        </button>
      </Form>
    </MyPageLayout>
  );
};

export default EditPassword;
