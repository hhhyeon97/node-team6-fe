import React, { useState, useEffect } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import '../style/css/ResetPasswordPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { useNavigate, useParams } from 'react-router-dom';
const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  //   useEffect(() => {
  //     dispatch(userActions.checkResetToken(token));
  //   }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userActions.resetPassword({ password, token }, navigate));
  };

  return (
    <Container className="reset_password_area d-flex justify-content-center align-items-center">
      <h2 className="title">비밀번호 재설정</h2>
      {/* {error && (
        <div className="error_message">
          <Alert variant="danger">{error}</Alert>
        </div>
      )} */}
      <Form className="reset_password_form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>새 비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <button className="submit_btn" type="submit">
          비밀번호 재설정
        </button>
      </Form>
    </Container>
  );
};

export default ResetPasswordPage;
