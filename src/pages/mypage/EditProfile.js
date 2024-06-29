import React, { useEffect, useState } from 'react';
import MyPageLayout from '../../Layout/MyPageLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../action/userAction';
import { Form, Col, Alert, Container } from 'react-bootstrap';
import CloudinaryUploadWidget from '../../utils/CloudinaryUploadWidget';
import AlertModal from '../../component/AlertModal';
import defaultProfile from '../../assets/img/profile_user.png';

// 회원정보 수정 컴포넌트
const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [contactError, setContactError] = useState('');
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    email: '',
    contact: '',
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // [ 유저 정보 받아오기 ]
  useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  // [ user가 로딩되면 초기 데이터 설정 ]
  useEffect(() => {
    if (user) {
      setFormData({
        image: user.image || '',
        name: user.name || '',
        email: user.email || '',
        contact: formatPhoneNumber(user.contact) || '',
      });
    }
  }, [user]);

  // [ form 요소 변화처리 ]
  const handleChange = (event) => {
    const { id, value } = event.target;
    const formattedValue = id === 'contact' ? formatPhoneNumber(value) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: formattedValue,
    }));

    if (id === 'email') {
      setEmailError('');
      dispatch(userActions.resetError());
    }

    if (id === 'name') {
      setNameError('');
    }

    if (id === 'contact') {
      const cleanedContact = formattedValue.replace(/\D/g, '');
      if (cleanedContact.length === 11) {
        setContactError('');
      }
    }
  };

  // [ 이미지 업로드 ]
  const uploadImage = (url) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  // [ 저장하기(submit) ]
  const handleSubmit = (event) => {
    event.preventDefault();
    const { image, name, email, contact } = formData;

    // 이메일 유효성 검사
    if (!emailRegex.test(email)) {
      setEmailError('유효한 이메일 주소를 입력해 주세요.');
      return;
    }

    // 이름 유효성 검사
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      setNameError('이름은 한글이나 영어만 입력할 수 있습니다.');
      return;
    }

    // 전화번호 유효성 검사
    const cleanedContact = contact.replace(/\D/g, '');
    if (cleanedContact.length !== 11) {
      setContactError('전화번호는 11자리 숫자여야 합니다.');
      return;
    }

    dispatch(userActions.editUser({ ...formData }, navigate));
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
        .join('-');
      return formattedValue;
    }

    return cleanValue;
  };

  // [ 회원탈퇴 버튼 ]
  const handleMemberOut = () => {
    setShowModal(true);
    console.log('userId', user._id);
  };

  return (
    <MyPageLayout title="나의 계정" cap="회원정보 수정">
      <Container>
        <Form className="edit_user_form_container" onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="image" className='profile_contaiener'>
            <Form.Label>프로필 이미지</Form.Label>
            <div class="upload_img_area">
              <div class="edit_image_box">
                <img
                  id="uploadedimage"
                  src={formData.image === '' ? defaultProfile : formData.image}
                  className="upload-image"
                  alt="uploadedimage"
                ></img>
              </div>
              <CloudinaryUploadWidget uploadImage={uploadImage} />
            </div>
          </Form.Group>
          <Col>
            <Form.Group as={Col} controlId="email">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                id="email"
                onChange={handleChange}
                type="text"
                placeholder="이메일을 입력해 주세요"
                required
                value={formData.email}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
              <Form.Label>이름</Form.Label>
              <Form.Control
                id="name"
                onChange={handleChange}
                type="text"
                placeholder="한글 또는 영어로 입력해 주세요"
                required
                value={formData.name}
                isInvalid={!!nameError}
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="contact">
              <Form.Label>연락처</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="11자리로 입력해 주세요"
                required
                id="contact"
                value={formData.contact}
                isInvalid={!!contactError}
              />
              <Form.Control.Feedback type="invalid">
                {contactError}
              </Form.Control.Feedback>
            </Form.Group>

          <button className="edit_submit_btn" type="submit">
            저장하기
          </button>
          </Col>
        </Form>
        <div class="outMember_container">
          <p className="outMember_btn" onClick={handleMemberOut}>
            회원탈퇴하기
          </p>
        </div>

        {user?.level === 'gold' ? (
          <AlertModal
            showModal={showModal}
            setShowModal={setShowModal}
            selectedId={user?._id}
            selectedName="회원 탈퇴하기"
            alertMessage={`${user?.name}회원님, 10% 혜택을 포기하실건가요? 🥺 회원님은 10% 할인 혜택을 받으실 수 있습니다`}
            btnText="회원탈퇴"
          />
        ) : (
          <AlertModal
            showModal={showModal}
            setShowModal={setShowModal}
            selectedId={user?._id}
            selectedName="회원 탈퇴하기"
            alertMessage={`${user?.name}회원님, 정말 누나컬처를 떠나실건가요? 🥲`}
            btnText="회원탈퇴"
          />
        )}
      </Container>
    </MyPageLayout>
  );
};

export default EditProfile;
