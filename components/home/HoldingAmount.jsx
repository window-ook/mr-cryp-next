import { NGTypo } from '@/defaultTheme';
import { Box } from '@mui/material';

export default function HoldingAmount({ balance, currency, price }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NGTypo>보유수량(평가금액)</NGTypo>
      <NGTypo fontWeight={'bold'}>
        {balance && currency ? `${balance} ${currency}` : null}
      </NGTypo>
      <NGTypo fontWeight={'bold'}>
        {parseFloat(parseFloat(price) * balance).toLocaleString()} KRW
      </NGTypo>
    </Box>
  );
}
