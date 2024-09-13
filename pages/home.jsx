import axios from 'axios';
import Image from 'next/image';
import AccountBox from '@/components/home/AccountBox';
import AccountDetail from '@/components/home/AccountDetail';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { InforTypo, SubTitle } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import { styled } from '@mui/system';

const ResponsiveImage = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 420px;
  max-height: 140px;

  @media (max-width: 600px) {
    max-width: 150px;
    max-height: 50px;
  }
`;

export async function getServerSideProps() {
  let balance = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/data/balance.json`,
    );
    balance = response.data;
  } catch (error) {
    console.log('계좌 현황 다운로드 중 에러 발생 : ', error);
  }

  return {
    props: {
      balance,
    },
  };
}

export default function Home({ balance }) {
  return (
    <Box
      sx={{
        width: '80%',
        my: 5,
        mx: 'auto',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} marginBottom={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'auto',
              backgroundColor: globalColors.skyblue['300'],
              overflow: 'hidden',
              gap: '1rem',
            }}
          >
            <ResponsiveImage
              priority
              src="/images/logo_mustache.png"
              alt="logo"
              width={420}
              height={140}
              style={{ width: 'auto', height: 'auto' }}
            />
            <InforTypo>실시간으로 가상화폐의 시세를 확인할 수 있고</InforTypo>
            <InforTypo>최신 소식도 확인 가능한 크립토 비서입니다!</InforTypo>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <SubTitle>내 계좌 현황</SubTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: globalColors.white,
              borderRadius: '30px',
              py: 5,
              boxShadow: 4,
            }}
          >
            <AccountBox balance={balance} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ margin: 'auto' }}>
          <AccountDetail balance={balance} />
        </Grid>
      </Grid>
    </Box>
  );
}
