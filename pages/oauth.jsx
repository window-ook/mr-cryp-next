import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function NaverAuth() {
  const router = useRouter();

  const fetchAccessToken = useCallback(async authCode => {
    try {
      const response = await axios.post('/api/naverAccessToken', { authCode });
      const { accessToken } = response.data;

      localStorage.setItem('socialType', 'Naver');
      localStorage.setItem('accessToken', accessToken);

      return accessToken;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const getAuthToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCancel = urlParams.get('error');
      const authCode = urlParams.get('code');

      if (authCancel) router.push('/');

      if (authCode) {
        const accessToken = await fetchAccessToken(authCode);
        await getUserData(accessToken);
        router.push('/home');
      }
    };

    getAuthToken();
  }, [router, fetchAccessToken]);

  const getUserData = async accessToken => {
    try {
      const response = await axios.post('/api/naverUserData', {
        token: accessToken,
      });
      const { id, imgUrl, nickname } = response.data;

      localStorage.setItem('userId', id);
      localStorage.setItem('imgUrl', imgUrl);
      localStorage.setItem('nickname', nickname);
    } catch (error) {
      console.error('유저 데이터 에러: ', error);
    }
  };

  return null;
}
