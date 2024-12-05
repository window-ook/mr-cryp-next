import { useRouter } from 'next/router';
import { loginGoogle } from '@/utils/firebase';
import { styled } from '@mui/system';
import { NGTypo } from '@/defaultTheme';
import Image from 'next/image';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(() => ({
  marginTop: '1rem',
  gap: '1rem',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
}));

export default function SocialLoginButton({
  CLIENT_ID,
  REDIRECT_URI,
  platform,
  bgColor,
  fontColor,
}) {
  const router = useRouter();
  const STATE = crypto.randomUUID();
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  const handleLogin = async () => {
    if (platform === 'google')
      await loginGoogle().then(() => router.push('/home'));
    if (platform === 'kakao') window.location.href = KAKAO_URL;
    if (platform === 'naver') window.location.href = NAVER_URL;
  };

  return (
    <StyledButton
      variant="contained"
      sx={{
        backgroundColor: bgColor,
        color: fontColor,
        px: platform === 'google' ? 3 : undefined,
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
    </StyledButton>
  );
}
