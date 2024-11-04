import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

export default function AccountMarketFlow({ flowSize }) {
  const [ripple, setRipple] = useState([]);
  const [etherium, setEtherium] = useState([]);

  const xLabels = ['6월', '7월', '8월', '9월', '10월', '11월'];

  useEffect(() => {
    const fetchMonthlyData = async (ticker, setData) => {
      try {
        const response = await axios.get('/api/candles', {
          params: {
            type: 'months',
            ticker,
            count: 6,
          },
        });

        const monthlyData = response.data.map(
          candle => candle.trade_price / 1000,
        );
        setData(monthlyData);
      } catch (error) {
        console.error(`월봉 데이터 다운로드 중 에러 발생 (${ticker}):`, error);
      }
    };

    fetchMonthlyData('KRW-ETH', setEtherium);
    fetchMonthlyData('KRW-XRP', setRipple);
  }, []);

  return (
    <LineChart
      width={flowSize.width}
      height={flowSize.height}
      series={[
        { data: etherium, label: '이더리움' },
        { data: ripple, label: '리플' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
