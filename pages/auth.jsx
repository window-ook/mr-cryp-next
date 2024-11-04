import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export async function getServerSideProps() {
  const KAKAO_CLIENT_ID = process.env.NEXT_KAKAO_CLIENT_ID;
  const KAKAO_CLIENT_SECRET = process.env.NEXT_KAKAO_CLIENT_SECRET;

  return {
    props: {
      KAKAO_CLIENT_ID,
      KAKAO_CLIENT_SECRET,
    },
  };
}

export default function KakaoAuth({ KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET }) {
  const router = useRouter();

  const getAccessToken = useCallback(
    async authCode => {
      try {
        const response = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: KAKAO_CLIENT_ID,
            redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
            code: authCode,
            client_secret: KAKAO_CLIENT_SECRET,
          }),
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        );

        const data = response.data;
        const accessToken = data.access_token;

        localStorage.setItem('socialType', 'Kakao');
        localStorage.setItem('accessToken', accessToken);

        return accessToken;
      } catch (error) {
        console.error('액세스 토큰 에러: ', error);
      }
    },
    [KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET],
  );

  useEffect(() => {
    const getAuthCode = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCancel = urlParams.get('error');
      const authCode = urlParams.get('code');

      if (authCancel) router.push('/');

      if (authCode) {
        const accessToken = await getAccessToken(authCode);
        await getUserData(accessToken);
        router.push('/home');
      }
    };

    getAuthCode();
  }, [router, getAccessToken]);

  const getUserData = async accessToken => {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      const data = response.data;
      const id = data.id;
      const imgUrl = data.kakao_account.profile.profile_image_url;
      const nickname = data.properties.nickname;

      localStorage.setItem('userId', id);
      localStorage.setItem('imgUrl', imgUrl);
      localStorage.setItem('nickname', nickname);
    } catch (error) {
      console.error('유저 데이터 에러: ', error);
    }
  };

  return null;
}
