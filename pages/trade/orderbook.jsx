import axios from 'axios';
import MarketCodeSelector from '@/components/Trade/MarketCodeSelector';
import { memo, useEffect, useState } from 'react';
import { globalColors } from '@/globalColors';
import { DescriptionTypo, NGTypo, PriceTypo, SubTitle } from '@/defaultTheme';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';

export async function getServerSideProps() {
  let marketCodes = [];

  try {
    const response = await axios.get('http://localhost:3000/api/marketCodes');
    marketCodes = response.data.marketCodes.slice(0, 200);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      marketCodes,
    },
  };
}

const OrderTable = memo(function OrderTable({ orderbookData, isConnected }) {
  return (
    <>
      <Box display="flex" alignItems="center" gap={4}>
        <DescriptionTypo>
          연결 상태 : {isConnected ? '🟢' : '🔴'}
        </DescriptionTypo>
      </Box>
      {orderbookData && isConnected ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 500,
            marginTop: '1rem',
          }}
        >
          <Box
            sx={{
              paddingLeft: 1,
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <NGTypo>마켓 티커 </NGTypo>
              <NGTypo fontWeight={'bold'}>
                {' '}
                : {orderbookData.targetMarketCode}
              </NGTypo>
            </Box>
            <NGTypo>총 매도 물량 : {orderbookData.total_ask_size}</NGTypo>
            <NGTypo>총 매수 물량 : {orderbookData.total_bid_size}</NGTypo>
          </Box>
          <Table display="flex">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <DescriptionTypo>매도 물량</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo>가격</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo>매수 물량</DescriptionTypo>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...orderbookData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <TableRow key={`${element.ask_price}${index}`}>
                    <TableCell sx={{ backgroundColor: 'skyblue' }}>
                      <PriceTypo fontSize={12} align="right">
                        {Number(element.ask_size)}
                      </PriceTypo>
                    </TableCell>
                    <TableCell>
                      <PriceTypo align="center" fontSize={12}>
                        {Number(element.ask_price).toLocaleString()}
                      </PriceTypo>
                    </TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                ))}
              {[...orderbookData.orderbook_units].map((element, index) => (
                <TableRow key={`${element.bid_price}${index}`}>
                  <TableCell sx={{ textAlign: 'right' }}>-</TableCell>
                  <TableCell>
                    <PriceTypo align="center" fontSize={12}>
                      {Number(element.bid_price).toLocaleString()}
                    </PriceTypo>
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: globalColors.hotpink['500'] }}
                  >
                    <PriceTypo fontSize={12}>{element.bid_size}</PriceTypo>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <LinearProgress color="primary" />
      )}
    </>
  );
});

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
          setOrderbookData(data);
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ marginBottom: 10 }}
    >
      <SubTitle>실시간 오더북</SubTitle>
      <MarketCodeSelector
        currentCode={currentCode}
        setCurrentCode={setCurrentCode}
        isLoading={isLoading}
        marketCodes={marketCodes}
      />
      <OrderTable orderbookData={orderbookData} isConnected={isConnected} />
    </Box>
  );
}
export default memo(Orderbook);
