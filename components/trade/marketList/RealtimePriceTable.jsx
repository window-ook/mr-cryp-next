import { useDispatch } from 'react-redux';
import {
  setCode,
  setRate,
  setPrevPrice,
  setCurrPrice,
} from '@/utils/redux/chartSlice';
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
} from '@mui/material';

export default function RealTimePriceTable({ marketCodeMap, tickers }) {
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
}
