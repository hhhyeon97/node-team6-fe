import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectHandler = () => {
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const getKakaoToken = async (authorizationCode) => {
      try {
        const response = await axios.get(
          `/api/auth/kakao/callback?code=${authorizationCode}`,
        );
        if (response.status === 200) {
          // 토큰을 성공적으로 받으면 원하는 페이지로 리다이렉트
          history.push('/');
        }
      } catch (error) {
        console.error('Error fetching Kakao token', error);
      }
    };

    if (code) {
      getKakaoToken(code);
    }
  }, [history]);

  return <div>Loading...</div>;
};

export default KakaoRedirectHandler;
