import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '@/redux/store';
import { Box, Grid, Button } from '@mui/material';
import { DescriptionTypo, theme } from '@/defaultTheme';
import axios from 'axios';
import dynamic from 'next/dynamic';
import MarketListGrid from '@/components/trade/MarketListGrid';
import MarketDetailGrid from '@/components/trade/MarketDetailGrid';
import OrderModal from '@/components/trade/OrderModal';
import TradeHistoryGrid from '@/components/trade/TradeHistoryGrid';
import OrderbookGrid from '@/components/trade/OrderbookGrid';

const DynamicChart = dynamic(() => import('@/components/trade/ChartGrid'), {
  ssr: false,
});

function ChartGrid() {
  return (
    <div>
      <DynamicChart />
    </div>
  );
}

export async function getServerSideProps() {
  let marketCodes = [];

  try {
    const response = await axios.get('http://localhost:3000/api/marketCodes');
    marketCodes = response.data.marketCodes;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      initialMarketCodes: marketCodes,
    },
  };
}

export default function Chart() {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpen(true)); // 모달 open
  const handleClose = () => dispatch(setOpen(false)); // 모달 close
  const code = useSelector(state => state.chart.code);
  const [orderbookData, setOrderbookData] = useState(null);

  useEffect(() => {
    if (code) {
      axios
        .get(`http://localhost:3001/api/orderbook/${code}`)
        .then(response => {
          setOrderbookData(response.data);
        })
        .catch(error => {
          console.error('웹소켓 오더북 데이터 호출 중 에러: ', error);
        });
    }
  }, [code, orderbookData]);

  return (
    <Box>
      <Grid
        container
        spacing={0}
        sx={{
          width: '100%',
          maxWidth: 1200,
          height: '1005',
          border: '1px',
          boxShadow: 3,
          mb: 10,
          '@media (max-width:450px)': {
            mb: 0,
          },
        }}
        margin="auto"
      >
        <Grid item xs={12} md={3}>
          <MarketListGrid />
        </Grid>
        <Grid item xs={12} md={9}>
          <MarketDetailGrid />
          <Box sx={{ position: 'relative' }}>
            <ChartGrid />
            <Button
              sx={{
                position: 'absolute',
                right: 5,
                top: 5,
                '&:hover': { color: theme.palette.secondary.light },
              }}
              onClick={handleOpen}
            >
              <DescriptionTypo>주문하기</DescriptionTypo>
            </Button>
          </Box>
          <Grid container spacing={0} padding="0">
            <Grid item xs={12} md={7}>
              <TradeHistoryGrid />
            </Grid>
            <Grid item xs={12} md={5}>
              <OrderbookGrid orderbookData={orderbookData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <OrderModal handleClose={handleClose} />
    </Box>
  );
}
