import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyPageLayout from '../../Layout/MyPageLayout';
import { Alert, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { userActions } from '../../action/userAction';
import '../../style/css/Mypage.css';

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

    // dispatch(userActions.changePassword({ newPassword }, navigate));
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
      <Form className="reset_password_form" onSubmit={handleSubmit}>
        {gapMessage && (
          <div>
            <Alert variant="danger" className="error_message">
              {gapMessage}
            </Alert>
          </div>
        )}
        {error && (
          <Alert variant="danger" className="error_message">
            {error}
          </Alert>
        )}
        <Form.Group controlId="formBasicPassword" className='ps_form_group'>
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
        <Form.Group controlId="formBasicConfirmPassword" className='ps_form_group'>
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
        <Button className="submit_btn set_ps_btn" type="submit" variant='dark' disabled={loading}>
          {loading ? '변경 중...' : '비밀번호 재설정'}
        </Button>
      </Form>
    </MyPageLayout>
  );
};

export default ChangePassword;
