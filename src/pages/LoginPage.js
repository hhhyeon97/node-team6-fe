import React, { useState, useEffect } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import '../style/css/LoginPage.css';
import SocialKakao from '../component/SocialKakao';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingText from '../component/LoadingText';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
  // const error = useSelector((state) => state.user.error);

  // const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  // const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  useEffect(() => {
    dispatch(userActions.resetError());
  }, [dispatch]);

  const loginWithEmail = (event) => {
    event.preventDefault();
    dispatch(userActions.loginWithEmail({ email, password }));
  };

  // const handleGoogleLogin = async (googleData) => {
  //   dispatch(userActions.loginWithGoogle(googleData.credential));
  // };

  const handleGoogleLoginSuccess = (response) => {
    dispatch(userActions.loginWithGoogle(response.access_token));
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginError,
  });

  const handleKakaoLogin = async (kakaoData) => {
    dispatch(userActions.loginWithKakao(kakaoData));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(userActions.resetError());
    }
  }, [email, password, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    <LoadingText />;
  }

  return (
    <>
      <Container className="login_area d-flex justify-content-center align-items-center">
        <h2 className="login_title">로그인</h2>
        {error && (
          <div className="login_error_message">
            <span className="error_message">
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
              </svg>
              {error}
            </span>
          </div>
        )}
        <Form className="login_form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ex) noonaculture@naver.com"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="password_input_wrap">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
          <div className="login_btn_area">
            <button type="submit" className="login_btn">
              로그인
            </button>
            <div className="info_register_message">
              아직 계정이 없으신가요? &nbsp;
              <Link to="/register">
                <button className="register_btn">회원가입 하기</button>
              </Link>{' '}
            </div>
          </div>
          <div className="sns_btn_area">
            <p>
              - &nbsp;<strong>SNS</strong> 계정으로 로그인하기 &nbsp;-
            </p>
            <div className="sns_btn_wrap">
              {/* <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                /> */}
              {/* <button className="custom_google_btn" onClick={googleLogin}>
                <img src="testImage/google.png" alt="구글" />
              </button> */}
              <button
                className="custom_google_btn"
                onClick={() => googleLogin()}
              >
                <img src="testImage/google.png" alt="구글" />
              </button>
              <SocialKakao
                onSuccess={handleKakaoLogin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </div>
        </Form>
        <div>
          <Link to="/find-password">
            <button className="find_password_btn">비밀번호 찾기</button>
          </Link>{' '}
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
