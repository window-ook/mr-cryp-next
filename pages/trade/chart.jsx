import { useDispatch } from 'react-redux';
import { setOpen } from '@/utils/redux/chartSlice';
import { DescriptionTypo, theme } from '@/defaultTheme';
import { Box, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import dynamic from 'next/dynamic';
import MarketListGrid from '@/components/trade/chart/marketList/MarketListGrid';
import MarketDetailGrid from '@/components/trade/chart/marketDetail/MarketDetailGrid';
import OrderModal from '@/components/trade/chart/modal/OrderModal';
import TradeHistoryGrid from '@/components/trade/chart/tradeHistory/TradeHistoryGrid';
import OrderbookGrid from '@/components/trade/chart/orderbook/OrderbookGrid';

const ChartBox = styled(Box)(() => ({
  marginTop: '3rem',
  marginBottom: '4rem',
}));

const GridContainer = styled(Grid)(() => ({
  width: '100%',
  maxWidth: '75rem',
  height: '1005',
  border: '0.063rem',
  boxShadow: '0.188rem',
}));

const OpenModalButton = styled(Button)(() => ({
  position: 'absolute',
  right: 5,
  top: 5,
  '&:hover': { color: theme.palette.secondary.light },
}));

const DynamicChart = dynamic(
  () => import('@/components/trade/chart/HighChartGrid'),
  {
    ssr: false,
  },
);

function HighChartGrid() {
  return (
    <div>
      <DynamicChart />
    </div>
  );
}

export async function getStaticProps() {
  const domain = process.env.NEXT_PUBLIC_API_URL;
  let marketCodes = [];

  try {
    const response = await axios.get(`${domain}/api/marketCodes`);
    marketCodes = response.data.marketCodes;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      marketCodes,
    },
    revalidate: 60 * 10,
  };
}

export default function Chart({ marketCodes }) {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));
  return (
    <ChartBox>
      <GridContainer container spacing={0} margin="auto">
        <Grid item xs={12} md={3}>
          <MarketListGrid marketCodes={marketCodes} />
        </Grid>
        <Grid item xs={12} md={9}>
          <MarketDetailGrid marketCodes={marketCodes} />
          <Box sx={{ position: 'relative' }}>
            <HighChartGrid />
            <OpenModalButton onClick={handleOpen}>
              <DescriptionTypo>주문하기</DescriptionTypo>
            </OpenModalButton>
          </Box>
          <Grid container spacing={0} padding="0">
            <Grid item xs={12} md={7}>
              <TradeHistoryGrid />
            </Grid>
            <Grid item xs={12} md={5}>
              <OrderbookGrid />
            </Grid>
          </Grid>
        </Grid>
      </GridContainer>
      <OrderModal handleClose={handleClose} />
    </ChartBox>
  );
}
