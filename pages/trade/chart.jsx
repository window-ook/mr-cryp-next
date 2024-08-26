import { useDispatch } from 'react-redux';
import { setOpen } from '@/redux/store';
import { Box, Grid, Button } from '@mui/material';
import { DescriptionTypo, theme } from '@/defaultTheme';
import dynamic from 'next/dynamic';
import MarketListGrid from '@/components/trade/MarketListGrid';
import MarketDetailGrid from '@/components/trade/MarketDetailGrid';
import OrderbookGrid from '@/components/trade/OrderbookGrid';
import TradeHistoryGrid from '@/components/trade/TradeHistoryGrid';
import OrderModal from '@/components/trade/OrderModal';

const DynamicChart = dynamic(() => import('../../components/trade/ChartGrid'), {
  ssr: false,
});

function ChartGrid() {
  return (
    <div>
      <DynamicChart />
    </div>
  );
}

export default function Chart() {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));

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
              <OrderbookGrid />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <OrderModal handleClose={handleClose} />
    </Box>
  );
}
