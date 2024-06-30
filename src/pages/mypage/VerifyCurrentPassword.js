import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { userActions } from '../../action/userAction';
import MyPageLayout from '../../Layout/MyPageLayout';
import LinedTitle from '../../component/LinedTitle';
import '../../style/css/PasswordPage.css';

const VerifyCurrentPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 480px)").matches);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userActions.verifyCurrentPassword(currentPassword, navigate));
  };

  useEffect(() => {
    if (error) {
      dispatch(userActions.resetError());
    }

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };   
  }, [currentPassword, dispatch]);

  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 480px)").matches);
  };

  return (
    <>
    {isMobile ? (
      <Container className='wrap-container mypage-wrap-container mobile_page_container'>
        <LinedTitle title={"나의 계정"} cap={"비밀번호 인증"}/>
        <div className="verify_ps_container">
          <span className="password_info_message">
            비밀번호 변경은 현재 비밀번호를 인증한 후에 진행할 수 있습니다.
          </span>
          <Form className="verify_password_form" onSubmit={handleSubmit}>
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
              <Form.Group controlId="formBasicCurrentPassword">
                {/* <Form.Label>현재 비밀번호</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="현재 비밀번호를 입력하세요"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  // isInvalid={!!error}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback> */}
              </Form.Group>
              <Button className="submit_btn" type="submit" variant='dark' disabled={loading}>
                {loading ? '인증 중...' : '비밀번호 확인'}
              </Button>
            </Form>
        </div>
      </Container>
    ):(
      <MyPageLayout title="나의 계정" cap="비밀번호 인증">
      <Container className="password_area d-flex justify-content-center align-items-center">
        <span className="password_info_message">
          비밀번호 변경은 현재 비밀번호를 인증한 후에 진행할 수 있습니다.
        </span>
        <Form className="verify_password_form" onSubmit={handleSubmit}>
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
            <Form.Group controlId="formBasicCurrentPassword">
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                // isInvalid={!!error}
              />
              {/* <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback> */}
            </Form.Group>
            <Button className="submit_btn" type="submit" disabled={loading}>
              {loading ? '인증 중...' : '비밀번호 확인'}
            </Button>
          </Form>
        </Container>
      </MyPageLayout>
    )}
  </>
  );
};

export default VerifyCurrentPassword;
