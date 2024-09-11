import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

const RealTimePriceTable = function RealTimePriceTable({
  marketCodeMap,
  tickers,
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
            tickers.map(ticker => (
              <TableRow
                key={`${ticker.acc_trade_price} + ${ticker.signed_change_rate}`}
                onClick={() => {
                  handleRowClick(
                    ticker.code || ticker.market,
                    ticker.signed_change_rate,
                    ticker.prev_closing_price,
                    ticker.trade_price,
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
                    {marketCodeMap[ticker.code] || marketCodeMap[ticker.market]}
                  </NGTypo>
                  <NGTypo fontSize={10} color={globalColors.market_code}>
                    {ticker.code || ticker.market}
                  </NGTypo>
                </TableCell>
                <TableCell align="right">
                  <PriceTypo
                    fontSize={11}
                    fontWeight={'bold'}
                    sx={{
                      color:
                        ticker.signed_change_rate > 0
                          ? globalColors.color_pos['400']
                          : ticker.signed_change_rate < 0
                            ? globalColors.color_neg['400']
                            : 'black',
                    }}
                  >
                    {ticker.trade_price !== undefined &&
                    ticker.trade_price !== null
                      ? ticker.trade_price.toLocaleString()
                      : 0}
                  </PriceTypo>
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      ticker.signed_change_rate > 0
                        ? globalColors.color_pos['400']
                        : ticker.signed_change_rate < 0
                          ? globalColors.color_neg['400']
                          : 'black',
                  }}
                  align="right"
                >
                  <Box display="flex" flexDirection="column">
                    <PriceTypo fontSize={10} fontWeight={'bold'}>
                      {(ticker.signed_change_rate * 100).toFixed(2)}%
                    </PriceTypo>
                    <PriceTypo fontSize={10} fontWeight={'bold'}>
                      {ticker.signed_change_price.toLocaleString()}
                    </PriceTypo>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={'flex'}>
                    <PriceTypo fontSize={10}>
                      {Math.round(
                        parseInt(ticker.acc_trade_price_24h) / 1000000,
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
};

/** 
 * 실시간 가격
  @description marketCodes: [{market, korean_name, english_name}]
  @description krwCodes: KRW로 시작하는 마켓 코드들
  @description tickers: KRW 마켓 코드들의 실시간 호가 정보
*/
function MarketListGrid({ marketCodes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickers, setTickers] = useState([]);
  const marketCodeMap = {};
  marketCodes.forEach(item => {
    marketCodeMap[item.market] = item.korean_name;
  });

  useEffect(() => {
    if (marketCodes) {
      const filtered = marketCodes
        .filter(code => code.market.includes('KRW'))
        .map(code => code.market);
      const fetchTickers = async () => {
        try {
          const codesString = filtered.join(',');
          const response = await fetch(`/api/tickers?codes=${codesString}`);
          const data = await response.json();
          setTickers(data);
        } catch (error) {
          console.error('마켓 리스트 다운로드 오류: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTickers();
      const interval = setInterval(fetchTickers, 2000);
      return () => clearInterval(interval);
    }
  }, [marketCodes]);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <RealTimePriceTable tickers={tickers} marketCodeMap={marketCodeMap} />;
}
export default memo(MarketListGrid);
