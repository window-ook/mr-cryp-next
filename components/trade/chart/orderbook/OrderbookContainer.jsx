import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import Orderbook from '@/components/trade/chart/orderbook/Orderbook';

function OrderbookContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderbookData, setOrderbookData] = useState([]);
  const code = useSelector(state => state.chart.code);
  const intervalTime = useSelector(state => state.chart.intervalTime);

  useEffect(() => {
    if (code) {
      const fetchOrderbookData = async () => {
        try {
          const response = await axios.get(`/api/orderbook/${code}`);
          const data = response.data;
          setOrderbookData(...data);
        } catch (error) {
          console.error('실시간 오더북 데이터 다운로드 에러: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrderbookData();
      const interval = setInterval(fetchOrderbookData, intervalTime);
      return () => clearInterval(interval);
    }
  }, [code, intervalTime]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <Orderbook orderbookData={orderbookData} />;
}
export default memo(OrderbookContainer);
