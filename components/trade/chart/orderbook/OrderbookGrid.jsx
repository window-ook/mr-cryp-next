import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import OrderbookTable from '@/components/trade/chart/orderbook/OrderbookTable';

/** 
 * 실시간 오더북
  @description orderbookData : 오더북 데이터
  @description code : 리스트에서 선택한 마켓 코드
*/
function OrderbookGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderbookData, setOrderbookData] = useState([]);
  const code = useSelector(state => state.chart.code);

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
      const interval = setInterval(fetchOrderbookData, 3000);
      return () => clearInterval(interval);
    }
  }, [code]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <OrderbookTable orderbookData={orderbookData} />;
}
export default memo(OrderbookGrid);
