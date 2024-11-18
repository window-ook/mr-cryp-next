import { useMemo, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MarketDetailTable from './MarketDetailTable';

/** 
 * 실시간 마켓 정보
  @description marketCodes: [{market, korean_name, english_name}]
  @description krwCodes: KRW로 시작하는 마켓 코드들
  @description tickers: KRW 마켓 코드들의 실시간 호가 정보
   */
export default function MarketDetailGrid({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticker, setTicker] = useState([]);
  const code = useSelector(state => state.chart.code);
  const intervalTime = useSelector(state => state.chart.intervalTime);

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [marketCodes]);

  useEffect(() => {
    if (code) {
      const fetchTicker = async () => {
        try {
          const response = await axios.get(`/api/tickers?codes=${code}`);
          const data = await response.data;
          setTicker(...data);
        } catch (error) {
          console.error('마켓 디테일 다운로드 오류: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTicker();
      const interval = setInterval(fetchTicker, intervalTime);
      return () => clearInterval(interval);
    }
  }, [code, intervalTime]);

  const numColor =
    ticker && ticker.signed_change_rate === 0
      ? 'text-black'
      : ticker && ticker.signed_change_rate > 0
        ? 'text-color_pos'
        : 'text-color_neg';

  if (isLoading) return <LinearProgress color="primary" />;

  return (
    <MarketDetailTable codeMap={codeMap} ticker={ticker} numColor={numColor} />
  );
}