import axios from 'axios';
import AccountBox from '@/components/home/AccountBox';
import AccountDetail from '@/components/home/AccountDetail';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { SubTitle } from '@/defaultTheme';
import { globalColors } from '@/globalColors';

export async function getServerSideProps() {
  let balance = [];

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/data/balance.json`,
    );
    balance = response.data;
  } catch (error) {
    console.log('계좌 현황 다운로드 에러: ', error);
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
          ></Box>
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
