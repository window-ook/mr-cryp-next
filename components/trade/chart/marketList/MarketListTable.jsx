import { useState } from 'react';
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
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableContainer = styled(TableContainer)(() => ({
  maxWidth: '100%',
  height: 'calc(900px - 55px)',
  overflow: 'auto',
  margin: 0,
  padding: 0,
  backgroundColor: globalColors.white,
}));

const StyledRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: '#e1e3e1',
    cursor: 'pointer',
  },
}));

export default function MarketListTable({ marketCodeMap, tickers }) {
  const [searchKeyword, setSearchKeyword] = useState('');

  const dispatch = useDispatch();

  const handleRowClick = (code, rate, prevPrice, currPrice) => {
    dispatch(setCode(code));
    dispatch(setRate(rate));
    dispatch(setPrevPrice(prevPrice));
    dispatch(setCurrPrice(currPrice));
  };

  const filteredTickers = tickers.filter(ticker => {
    const marketName =
      marketCodeMap[ticker.code] || marketCodeMap[ticker.market];
    return (
      (marketName && marketName.includes(searchKeyword.toLowerCase())) ||
      (ticker.code &&
        ticker.code.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (ticker.market &&
        ticker.market.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  });

  return (
    <>
      <TextField
        label="마켓 검색하기"
        id="outlined"
        fullWidth
        value={searchKeyword}
        onChange={e => setSearchKeyword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: 'white', borderRadius: 1 }}
      />
      <StyledTableContainer>
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
            {filteredTickers &&
              filteredTickers.map(ticker => (
                <StyledRow
                  key={`${ticker.acc_trade_price} + ${ticker.signed_change_rate}`}
                  onClick={() => {
                    handleRowClick(
                      ticker.code || ticker.market,
                      ticker.signed_change_rate,
                      ticker.prev_closing_price,
                      ticker.trade_price,
                    );
                  }}
                >
                  <TableCell>
                    <NGTypo
                      fontSize={11}
                      fontWeight={'bold'}
                      sx={{ maxWidth: '5em', overflowWrap: 'break-word' }}
                    >
                      {marketCodeMap[ticker.code] ||
                        marketCodeMap[ticker.market]}
                    </NGTypo>
                    <NGTypo fontSize={10} color={globalColors.market_code}>
                      {ticker.code || ticker.market}
                    </NGTypo>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color:
                        ticker.signed_change_rate > 0
                          ? globalColors.color_pos['400']
                          : ticker.signed_change_rate < 0
                            ? globalColors.color_neg['400']
                            : 'black',
                    }}
                  >
                    <PriceTypo fontSize={11} fontWeight={'bold'}>
                      {ticker.trade_price !== undefined &&
                      ticker.trade_price !== null
                        ? ticker.trade_price.toLocaleString()
                        : 0}
                    </PriceTypo>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color:
                        ticker.signed_change_rate > 0
                          ? globalColors.color_pos['400']
                          : ticker.signed_change_rate < 0
                            ? globalColors.color_neg['400']
                            : 'black',
                    }}
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
                </StyledRow>
              ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
}
