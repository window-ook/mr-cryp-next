import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { NGTypo } from '@/defaultTheme';
import { loginGoogle } from '@/utils/firebase';

export default function SocialButton({
  REST_API_KEY,
  REDIRECT_URI,
  platform,
  bgColor,
  fontColor,
}) {
  const router = useRouter();
  const STATE = crypto.randomUUID();
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REST_API_KEY}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  const handleLogin = async () => {
    if (platform === 'google')
      await loginGoogle().then(() => router.push('/home'));
    if (platform === 'kakao') window.location.href = KAKAO_URL;
    if (platform === 'naver') window.location.href = NAVER_URL;
  };

  return (
    <Button
      variant="contained"
      sx={{
        mt: 3,
        gap: 1,
        backgroundColor: bgColor,
        color: fontColor,
        display: 'flex',
        alignItems: 'center',
        px: platform === 'google' ? 3 : undefined,
        '&:hover': {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }}
      onClick={handleLogin}
    >
      <Image
        src={`/images/logo_${platform}.webp`}
        alt={platform}
        width="20"
        height="20"
      />
      <NGTypo>
        {platform === 'kakao'
          ? '카카오'
          : platform === 'naver'
            ? '네이버'
            : '구글'}{' '}
        로그인
      </NGTypo>
    </Button>
  );
}
