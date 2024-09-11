import { NGTypo } from '@/defaultTheme';
import Image from 'next/image';
import Button from '@mui/material/Button';

export default function ButtonKakao() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    try {
      window.location.href = kakaoURL;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          gap: 1,
          backgroundColor: '#fddc3f',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#000000',
          },
        }}
        onClick={handleLogin}
      >
        <Image
          src="/images/logo_kakao.png"
          alt="카카오 로고"
          width="20"
          height="20"
        />
        <NGTypo>카카오 로그인</NGTypo>
      </Button>
    </div>
  );
}
