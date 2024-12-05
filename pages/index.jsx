import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DescriptionTypo, NGTypo, LogoTypo, theme } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import { styled } from '@mui/system';
import { Avatar, Box, CssBaseline, Grid, Link, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SocialLoginButton from '@/components/layout/SocialLoginButton';
import Image from 'next/image';
import Head from 'next/head';

const ButtonsBox = styled(Box)(() => ({
  my: 8,
  mx: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const LoginTypo = styled(DescriptionTypo)(() => ({
  color: theme.palette.primary.main,
  textShadow: 'none',
  fontSize: '2rem',
}));

const StyledLogoTypo = styled(LogoTypo)(() => ({
  letterSpacing: '.3rem',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '@media (max-width: 900px)': {
    fontSize: '1.5rem',
  },
}));

export async function getServerSideProps() {
  const KAKAO_CLIENT_ID = process.env.NEXT_KAKAO_CLIENT_ID;
  const NAVER_CLIENT_ID = process.env.NEXT_NAVER_CLIENT_ID;

  return {
    props: {
      KAKAO_CLIENT_ID,
      NAVER_CLIENT_ID,
    },
  };
}

function Copyright(props) {
  return (
    <NGTypo variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyrights All reserved © '}
      <Link color="inherit" href="https://github.com/window-ook/mr-cryp-next">
        Mr.Cryp
      </Link>{' '}
      {new Date().getFullYear()}
    </NGTypo>
  );
}

export default function Root({ KAKAO_CLIENT_ID, NAVER_CLIENT_ID }) {
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      if (userId) {
        alert('이미 로그인 되어있습니다.');
        router.push('/home');
      }
    }
  }, [router]);

  return (
    <main>
      <Head>
        <title>미스터 크립 Mr.cryp</title>
      </Head>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* 로그인 폼 */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ButtonsBox>
            <Avatar
              style={{
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <LoginTypo>로그인</LoginTypo>
            <SocialLoginButton
              platform={'google'}
              bgColor={'#094eed'}
              fontColor={'#fff'}
            />
            <SocialLoginButton
              CLIENT_ID={KAKAO_CLIENT_ID}
              REDIRECT_URI={KAKAO_REDIRECT_URI}
              platform={'kakao'}
              bgColor={'#fddc3f'}
              fontColor={'#000000'}
            />
            <SocialLoginButton
              CLIENT_ID={NAVER_CLIENT_ID}
              REDIRECT_URI={NAVER_REDIRECT_URI}
              platform={'naver'}
              bgColor={'#00c73d'}
              fontColor={'#fff'}
            />
            <Copyright sx={{ mt: 5 }} />
          </ButtonsBox>
        </Grid>
        {/* 포스터 사이드 */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: { xs: 'none', sm: 'block' },
            backgroundColor: globalColors.skyblue['400'],
          }}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'100vh'}
            gap={2}
          >
            <Image
              alt="로고 이미지"
              src="/images/logo_mustache.webp"
              width={100}
              height={30}
              priority={true}
              style={{
                width: '10%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
            <StyledLogoTypo noWrap fontWeight="bold" fontSize={'2.5rem'}>
              Mr.Cryp
            </StyledLogoTypo>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
