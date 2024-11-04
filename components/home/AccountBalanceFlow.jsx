import { theme } from '@/defaultTheme';
import { LineChart } from '@mui/x-charts';

export default function AccountBalanceFlow({ totalBalance, flowSize }) {
  const history = [4500, 5681, 5998, 7100, 8502];
  const xLabels = ['6.1', '7.1', '8.1', '9.1', '10.1', '11.1'];

  return (
    <LineChart
      width={flowSize.width}
      height={flowSize.height}
      series={[{ data: [...history, totalBalance / 1000] }]}
      colors={[theme.palette.primary.light]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
