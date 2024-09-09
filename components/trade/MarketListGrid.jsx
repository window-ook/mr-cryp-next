import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { throttle } from 'lodash';
import {
  setCode,
  setRate,
  setPrevPrice,
  setCurrPrice,
} from '@/redux/chartSlice';
import {
  DescriptionTypo,
  NGTypo,
  PriceTypo,
  StyledTableCell,
} from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  LinearProgress,
} from '@mui/material';

const RealTimePriceTable = memo(function RealTimePriceTable({
  tickers,
  marketCodeMap,
}) {
  const dispatch = useDispatch();

  const handleRowClick = (code, rate, prevPrice, currPrice) => {
    dispatch(setCode(code));
    dispatch(setRate(rate));
    dispatch(setPrevPrice(prevPrice));
    dispatch(setCurrPrice(currPrice));
  };

  return (
    <TableContainer
      sx={{
        maxWidth: '100%',
        height: 900,
        overflow: 'auto',
        margin: 0,
        padding: 0,
        backgroundColor: globalColors.white,
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <DescriptionTypo fontSize={12}>코인</DescriptionTypo>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescriptionTypo fontSize={12}>현재가</DescriptionTypo>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescriptionTypo fontSize={12}>전일대비</DescriptionTypo>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescriptionTypo fontSize={12}>거래대금</DescriptionTypo>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickers &&
            tickers.map(tickerData => (
              <TableRow
                key={tickerData.code}
                onClick={() => {
                  handleRowClick(
                    tickerData.code,
                    tickerData.signed_change_rate,
                    tickerData.prev_closing_price,
                    tickerData.trade_price,
                  );
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: '#aeb0af',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell>
                  <NGTypo
                    fontSize={11}
                    fontWeight={'bold'}
                    sx={{ maxWidth: '5em', overflowWrap: 'break-word' }}
                  >
                    {marketCodeMap[tickerData.code]}
                  </NGTypo>
                  <NGTypo fontSize={10} color={globalColors.market_code}>
                    {tickerData.code}
                  </NGTypo>
                </TableCell>
                <TableCell align="right">
                  <PriceTypo
                    fontSize={11}
                    fontWeight={'bold'}
                    sx={{
                      color:
                        tickerData.signed_change_rate > 0
                          ? globalColors.color_pos['400']
                          : tickerData.signed_change_rate < 0
                            ? globalColors.color_neg['400']
                            : 'black',
                    }}
                  >
                    {tickerData.trade_price.toLocaleString()}
                  </PriceTypo>
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      tickerData.signed_change_rate > 0
                        ? globalColors.color_pos['400']
                        : tickerData.signed_change_rate < 0
                          ? globalColors.color_neg['400']
                          : 'black',
                  }}
                  align="right"
                >
                  <Box display="flex" flexDirection="column">
                    <PriceTypo fontSize={10} fontWeight={'bold'}>
                      {(tickerData.signed_change_rate * 100).toFixed(2)}%
                    </PriceTypo>
                    <PriceTypo fontSize={10} fontWeight={'bold'}>
                      {tickerData.signed_change_price.toLocaleString()}
                    </PriceTypo>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={'flex'}>
                    <PriceTypo fontSize={10}>
                      {Math.round(
                        parseInt(tickerData.acc_trade_price_24h) / 1000000,
                      ).toLocaleString()}
                    </PriceTypo>
                    <NGTypo fontSize={10}>백만</NGTypo>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

/** 
 * 실시간 가격
  @description marketCodes: [{market, korean_name, english_name}]
  @description krwCodes: KRW로 시작하는 마켓 코드들
  @description tickers: KRW 마켓 코드들의 실시간 호가 정보
*/
function MarketListGrid({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [krwCodes, setKrwCodes] = useState([]);
  const [tickers, setTickers] = useState([]);
  const marketCodeMap = {};

  useEffect(() => {
    if (marketCodes) {
      setIsLoading(false);
      const filtered = marketCodes
        .filter(element => element.market.includes('KRW'))
        .map(element => element.market);
      setKrwCodes(filtered);
    }
  }, [marketCodes]);

  useEffect(() => {
    if (krwCodes.length > 0) {
      krwCodes.forEach(item => {
        marketCodeMap[item.market] = item.korean_name;
      });
      const codesString = krwCodes.join(',');
      const wsTicker = new WebSocket(
        `ws://localhost:3001/api/tickers?codes=${codesString}`,
      );

      wsTicker.onmessage = throttle(event => {
        const data = JSON.parse(event.data);
        console.log('받은 데이터:', data);
        if (data && data.code) {
          setTickers(prevTickers => {
            const updatedTickers = [...prevTickers];
            const index = updatedTickers.findIndex(t => t.code === data.code);
            if (index > -1) {
              updatedTickers[index] = data;
            } else {
              updatedTickers.push(data);
            }
            return updatedTickers;
          });
        }
      }, 2000);
    }
  }, [krwCodes, marketCodeMap]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <RealTimePriceTable tickers={tickers} marketCodeMap={marketCodeMap} />;
}
export default memo(MarketListGrid);
