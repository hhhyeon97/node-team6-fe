import React, { useState, useEffect } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(userActions.resetError());
  }, [dispatch]);

  const loginWithEmail = (event) => {
    event.preventDefault();
    dispatch(userActions.loginWithEmail({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Container className="login-area">
        {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ex) noonaculture@naver.com"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="display-space-between login-button-area">
            <button type="submit" className="custom-btn">
              로그인
            </button>
            <div>
              아직 계정이 없으세요? <Link to="/register">회원가입 하기</Link>{' '}
            </div>
          </div>

          <div className="text-align-center mt-2">
            <p>- 간편 로그인 -</p>
            <div className="display-center">
              <button>구글 로그인</button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default LoginPage;
