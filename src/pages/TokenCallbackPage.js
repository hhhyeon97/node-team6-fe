// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const TokenCallbackPage = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');

//     if (token) {
//       localStorage.setItem('token', token);
//       // 로그인 성공 후 메인 페이지로 리다이렉트
//       navigate('/');
//     } else {
//       // token이 없으면 로그인 페이지로 리다이렉트
//       navigate('/login');
//     }
//   }, [navigate]);

//   return <div>Loading...</div>;
// };

// export default TokenCallbackPage;
