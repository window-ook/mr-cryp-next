import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function KakaoAuth() {
  const router = useRouter();

  useEffect(() => {
    const getAuthToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCancel = urlParams.get('error'); // 약관 동의 X
      const authCode = urlParams.get('code'); // 약관 동의 O

      if (authCancel) {
        try {
          console.log('약관 동의 중 취소');
          window.alert('시작화면으로 돌아갑니다');
          router.push('/');
        } catch (error) {
          console.log('취소 에러 : ', error);
        }
      }
      try {
        if (authCode) {
          const accessToken = await fetchAccessToken(authCode);
          await getUserData(accessToken);
          router.push('/home');
        }
      } catch (error) {
        console.error('로그인 에러 : ', error);
      }
    };

    getAuthToken();
  }, [router]);

  const fetchAccessToken = async authCode => {
    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
          redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          code: authCode,
          client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET_KEY,
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
      console.error('액세스 토큰 가져오기 실패: ', error);
    }
  };

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
      console.error('유저 데이터 가져오기 실패: ', error);
    }
  };

  return null;
}
