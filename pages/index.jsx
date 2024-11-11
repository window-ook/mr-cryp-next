import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import { Link } from '@mui/material';
import { DescriptionTypo, NGTypo, LogoTypo, theme } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import Avatar from '@mui/material/Avatar';
import SocialButton from '@/components/layout/SocialButton';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Image from 'next/image';
import Head from 'next/head';

const ButtonsBox = styled(Box)(() => ({
  my: 8,
  mx: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ImageContainer = styled(Box)(() => ({
  width: '28.125rem',
  height: '15%',
  '@media (max-width: 900px)': {
    width: '13.125rem',
    height: '8%',
  },
}));

const StyledLogoTypo = styled(LogoTypo)(() => ({
  letterSpacing: '.3rem',
  color: theme.palette.secondary.main,
  textDecoration: 'none',
  textShadow: globalColors.shadow_text,
  mr: 2,
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
            <Avatar sx={{ m: 1, backgroundColor: theme.palette.primary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            <DescriptionTypo
              fontSize={30}
              sx={{ color: theme.palette.primary.main, mb: 1 }}
            >
              로그인
            </DescriptionTypo>
            <SocialButton
              platform={'google'}
              bgColor={'#094eed'}
              fontColor={'#fff'}
            />
            <SocialButton
              CLIENT_ID={KAKAO_CLIENT_ID}
              REDIRECT_URI={KAKAO_REDIRECT_URI}
              platform={'kakao'}
              bgColor={'#fddc3f'}
              fontColor={'#000000'}
            />
            <SocialButton
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
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'100vh'}
          >
            <ImageContainer sx={{ position: 'relative' }}>
              <Image
                alt="로고 이미지 입니다 | logo image"
                src="/images/logo_mustache.webp"
                fill
                sizes="(max-width: 900px) '13.125rem', '28.125rem'"
              />
            </ImageContainer>
            <StyledLogoTypo noWrap fontWeight="bold" fontSize={'3.5rem'}>
              Mr.Cryp
            </StyledLogoTypo>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
