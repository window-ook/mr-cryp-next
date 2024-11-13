import { memo, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';

const OrderbookTableAlone = dynamic(
  () => import('@/components/trade/orderbook/OrderbookTableAlone'),
  {
    ssr: false,
    loading: () => <LinearProgress color="primary" />,
  },
);
export async function getStaticProps() {
  const domain = process.env.NEXT_PUBLIC_API_URL;
  let marketCodes = [];

  try {
    const response = await axios.get(`${domain}/api/marketCodes`);
    marketCodes = response.data.marketCodes.slice(0, 200);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      marketCodes,
    },
    revalidate: 60,
  };
}

/** 
 * 실시간 오더북
  @description marketCodes: [{market, korean_name, english_name}]
  @description orderbookData : 오더북 데이터
  @description currentCode : 현재 선택한 코드
*/
function Orderbook({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [orderbookData, setOrderbookData] = useState([]);
  const [currentCode, setCurrentCode] = useState(
    marketCodes.length > 0 ? marketCodes[0].market : 'KRW-BTC',
  );

  useEffect(() => {
    if (currentCode) {
      const fetchOrderbookData = async () => {
        try {
          const response = await axios.get(`/api/orderbook/${currentCode}`);
          const data = response.data;
          setOrderbookData(...data);
        } catch (error) {
          console.error('실시간 오더북 데이터 다운로드 에러: ', error);
        } finally {
          setIsLoading(false);
          setIsConnected(true);
        }
      };

      fetchOrderbookData();
      const interval = setInterval(fetchOrderbookData, 3000);
      return () => clearInterval(interval);
    }
  }, [currentCode]);

  return (
    <OrderbookTableAlone
      orderbookData={orderbookData}
      isConnected={isConnected}
      currentCode={currentCode}
      setCurrentCode={setCurrentCode}
      isLoading={isLoading}
      marketCodes={marketCodes}
    />
  );
}
export default memo(Orderbook);
