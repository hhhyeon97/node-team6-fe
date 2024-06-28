import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import { userActions } from '../../action/userAction';
import MyPageLayout from '../../Layout/MyPageLayout';

const VerifyCurrentPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userActions.verifyCurrentPassword(currentPassword, navigate));
  };

  return (
    <MyPageLayout title="나의 계정" cap="비밀번호 인증">
      <span className="message">
        비밀번호 변경은 현재 비밀번호를 인증한 후에 진행할 수 있습니다.
      </span>
      {errorMessage && (
        <div>
          <Alert variant="danger" className="error_message">
            {errorMessage}
          </Alert>
        </div>
      )}
      <Form className="verify_password_form" onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? '인증 중...' : '비밀번호 인증'}
        </Button>
      </Form>
    </MyPageLayout>
  );
};

export default VerifyCurrentPassword;
