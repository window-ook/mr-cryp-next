import axios from 'axios';
import MarketCodeSelector from '@/components/Trade/MarketCodeSelector';
import { memo, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { DescriptionTypo, PriceTypo, SubTitle } from '@/defaultTheme';
import {
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  LinearProgress,
} from '@mui/material';

const headStyle = {
  fontSize: 20,
  '@media (max-width:900px)': {
    fontSize: 11,
  },
};

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

const TradeTable = memo(function TradeTable({
  isConnected,
  tradeData,
  handleDisconnect,
}) {
  return (
    <>
      <Box display="flex" alignItems="center" gap={4}>
        <DescriptionTypo>
          연결 상태 : {isConnected ? '🟢' : '🔴'}
        </DescriptionTypo>
        <Button onClick={handleDisconnect}>
          <DescriptionTypo>연결종료</DescriptionTypo>
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1000, marginTop: '1rem' }}
      >
        {tradeData && isConnected ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>코인</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>체결 ID</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>체결 시간</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>ASK/BID</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>체결 가격</DescriptionTypo>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tradeData
                .slice()
                .reverse()
                .map((element, index) => (
                  <TableRow key={`${index}${element.trade_time}`}>
                    <TableCell align="center">{element.code}</TableCell>
                    <TableCell align="center">
                      {Number(element.sequential_id)}
                    </TableCell>
                    <TableCell align="center">
                      {element.trade_date} {element.trade_time}
                    </TableCell>
                    <TableCell align="center">{element.ask_bid}</TableCell>
                    <TableCell align="center">
                      <PriceTypo fontSize={11}>
                        {Number(element.prev_closing_price).toLocaleString()}
                      </PriceTypo>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <LinearProgress color="primary" />
        )}
      </TableContainer>
    </>
  );
});

function TradeHistory({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [tradeData, setTradeData] = useState([]);
  const [currentCode, setCurrentCode] = useState(
    marketCodes.length > 0 ? marketCodes[0].market : 'KRW-BTC',
  );
  const [wsInstance, setWsInstance] = useState(null);

  useEffect(() => {
    if (currentCode) {
      setTradeData([]);

      const ws = new WebSocket(`ws://localhost:3001/api/trade/${currentCode}`);
      ws.onmessage = throttle(event => {
        const data = JSON.parse(event.data);
        setTradeData(prev => [...prev, data]);
        setIsLoading(false);
        setIsConnected(true);
      }, 2000);

      setWsInstance(ws);
    }
  }, [currentCode]);

  const handleDisconnect = () => {
    if (wsInstance) {
      wsInstance.close();
      setIsConnected(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ marginBottom: 10 }}
    >
      <SubTitle>실시간 거래내역</SubTitle>
      <MarketCodeSelector
        currentCode={currentCode}
        setCurrentCode={setCurrentCode}
        isLoading={isLoading}
        marketCodes={marketCodes}
      />
      <TradeTable
        tradeData={tradeData}
        isConnected={isConnected}
        handleDisconnect={handleDisconnect}
      />
    </Box>
  );
}
export default memo(TradeHistory);
