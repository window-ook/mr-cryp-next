import { NGTypo } from '@/defaultTheme';
import { Box } from '@mui/material';

export default function HoldingRatio({ percentage }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NGTypo>보유비중</NGTypo>
      <NGTypo fontWeight={'bold'}>{percentage.toFixed(2)}%</NGTypo>
    </Box>
  );
}
