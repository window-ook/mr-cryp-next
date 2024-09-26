import axios from 'axios';
import TradeTable from './TradeTable';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';

/** 
 * 실시간 거래 내역
  @description tradeData : 거래 내역 데이터
  @description code : 리스트에서 선택한 마켓 코드
*/
function TradeHistoryGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [tradeData, setTradeData] = useState([]);
  const code = useSelector(state => state.chart.code);

  useEffect(() => {
    if (code) {
      setTradeData([]);

      const fetchTradeData = async () => {
        try {
          const response = await axios.get(`/api/trade/${code}`);
          const data = response.data;

          setTradeData(prevTradeData => {
            const newData = data.filter(
              item =>
                !prevTradeData.some(
                  prevItem => prevItem.sequential_id === item.sequential_id,
                ),
            );
            return [...prevTradeData, ...newData];
          });
        } catch (error) {
          console.error('실시간 거래 내역 데이터 다운로드 에러: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTradeData();
      const interval = setInterval(fetchTradeData, 3000);
      return () => clearInterval(interval);
    }
  }, [code]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <TradeTable tradeData={tradeData} />;
}

export default memo(TradeHistoryGrid);
