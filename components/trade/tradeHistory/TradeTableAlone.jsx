import { memo } from 'react';
import { DescriptionTypo, PriceTypo, theme } from '@/defaultTheme';
import { styled } from '@mui/system';
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
import MarketCodeSelector from '@/components/trade/MarketCodeSelector';

const HeadTypo = styled(DescriptionTypo)(() => ({
  fontSize: '1.25rem',
  '@media (max-width:900px)': {
    fontSize: '0.688rem',
  },
}));

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
      sx={{
        mb: '2rem',
        mt: '2rem',
        [theme.breakpoints.down('md')]: {
          mb: '5rem',
        },
      }}
    >
      <SubTitle
        sx={{
          [theme.breakpoints.down('md')]: {
            mb: '1rem',
          },
        }}
      >
        실시간 거래내역
      </SubTitle>
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
        sx={{ maxWidth: '62.5rem', marginTop: '1rem' }}
      >
        {tradeData && isConnected ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <HeadTypo>코인</HeadTypo>
                </TableCell>
                <TableCell align="center">
                  <HeadTypo>체결 ID</HeadTypo>
                </TableCell>
                <TableCell align="center">
                  <HeadTypo>체결 시간</HeadTypo>
                </TableCell>
                <TableCell align="center">
                  <HeadTypo>ASK/BID</HeadTypo>
                </TableCell>
                <TableCell align="center">
                  <HeadTypo>체결 가격</HeadTypo>
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
