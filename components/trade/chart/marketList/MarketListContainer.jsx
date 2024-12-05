import { memo, useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import MarketList from './MarketList';

function MarketListContainer({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickers, setTickers] = useState([]);
  const intervalTime = useSelector(state => state.chart.intervalTime);

  const codeMap = useMemo(() => {
    const map = {};
    marketCodes.forEach(item => {
      map[item.market] = item.korean_name;
    });
    return map;
  }, [marketCodes]);

  useEffect(() => {
    if (marketCodes) {
      const filtered = marketCodes
        .filter(code => code.market.includes('KRW'))
        .map(code => code.market);
      const fetchTickers = async () => {
        try {
          const codesString = filtered.join(',');
          const response = await axios.get(`/api/tickers?codes=${codesString}`);
          const data = await response.data;
          setTickers(data);
        } catch (error) {
          console.error('마켓 리스트 다운로드 오류: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTickers();
      const interval = setInterval(fetchTickers, intervalTime);
      return () => clearInterval(interval);
    }
  }, [marketCodes, intervalTime]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <MarketList tickers={tickers} codeMap={codeMap} />;
}
export default memo(MarketListContainer);
