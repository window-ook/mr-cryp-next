import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/system';
import { DescriptionTypo, SubTitle } from '@/defaultTheme';
import axios from 'axios';
import AccountMarketFlow from '@/components/home/AccountMarketFlow';
import AccountBalanceFlow from '@/components/home/AccountBalanceFlow';
import AccountDetailTable from '@/components/home/AccountDetailTable';
import AccountDetailPie from '@/components/home/AccountDetailPie';

const HomeBox = styled(Box)(() => ({
  width: '80%',
  height: '100%',
  margin: '4rem auto 4rem auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4rem',
  '@media (max-width:1075px)': {
    flexDirection: 'column',
    width: '40%',
  },
}));

const FlowBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));

export default function Home() {
  const [balance, setBalance] = useState([]);
  const [flowSize, setFlowSize] = useState({ width: 600, height: 300 });

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/data/balance.json`,
        );
        let fetched = response.data;
        setBalance(fetched);
      } catch (error) {
        console.log('계좌 현황 다운로드 에러: ', error);
      }
    };

    const updateChartSize = () => {
      const width = window.innerWidth;

      if (width > 1400) {
        setFlowSize({ width: 600, height: 300 });
      } else if (width > 1350) {
        setFlowSize({ width: 400, height: 200 });
      } else if (width > 450) {
        setFlowSize({ width: 300, height: 150 });
      }
    };

    getBalance();
    updateChartSize();
    window.addEventListener('resize', updateChartSize);

    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  const totalBalance = balance.reduce(
    (sum, item) => sum + parseFloat(item.balance) * item.avg_buy_price,
    0,
  );

  return (
    <HomeBox>
      <Box>
        <SubTitle sx={{ mb: '1.25rem' }}>내 보유 자산</SubTitle>
        <AccountDetailPie balance={balance} />
        <AccountDetailTable balance={balance} />
      </Box>
      <FlowBox>
        <div>
          <DescriptionTypo>보유 자산 변동 (단위: 1000 KRW)</DescriptionTypo>
          <AccountBalanceFlow totalBalance={totalBalance} flowSize={flowSize} />
        </div>
        <div>
          <DescriptionTypo>
            보유 코인 시세 변동 (단위: 1000 KRW)
          </DescriptionTypo>
          <AccountMarketFlow flowSize={flowSize} />
        </div>
      </FlowBox>
    </HomeBox>
  );
}
