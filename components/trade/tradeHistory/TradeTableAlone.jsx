import MarketCodeSelector from '@/components/trade/MarketCodeSelector';
import { memo } from 'react';
import { DescriptionTypo, PriceTypo } from '@/defaultTheme';
import {
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
import { SubTitle } from '@/defaultTheme';

const headStyle = {
  fontSize: 20,
  '@media (max-width:900px)': {
    fontSize: 11,
  },
};

function TradeTableAlone({
  isConnected,
  tradeData,
  currentCode,
  setCurrentCode,
  isLoading,
  marketCodes,
}) {
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
      <Box display="flex" alignItems="center" gap={4}>
        <DescriptionTypo>
          연결 상태 : {isConnected ? '🟢' : '🔴'}
        </DescriptionTypo>
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
              {tradeData.slice().map((element, index) => (
                <TableRow key={`${index}${element.trade_time}`}>
                  <TableCell align="center">{element.market}</TableCell>
                  <TableCell align="center">
                    {Number(element.sequential_id)}
                  </TableCell>
                  <TableCell align="center">
                    {element.trade_date_utc} {element.trade_time_utc}
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
    </Box>
  );
}

export default memo(TradeTableAlone);
